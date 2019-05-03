var express = require('express')
var router = express.Router()

var db = require('../db');

var dotEnv=require("dotenv");
dotEnv.config();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var verifyToken=require("../routes/verifyToken")

//Register User
router.route("/register")
    .post((req,res)=>{
        console.log("register api call")
        //encrypt password before save
        var hashedPassword=bcrypt.hashSync(req.body.password, 8);
        req.body.password=hashedPassword;

        var newUser=new db.User(req.body);
        newUser.save((err,user)=>{
            console.log(JSON.stringify(err))
            if(err) res.status(500).send(err)
            //create jwt token
            var token = jwt.sign({ id: user._id },
                process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            console.log(token);
            res.status(200).send({auth:true,token: token});
        })
    })

//Login User
router.route("/login")
    .post((req,res)=>{
        db.User.findOne({
            email:req.body.email
        })
        .then((user)=>{
            if (!user) return res.status(404).send('No user found.');
            
            //Check password matches
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
            var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        })
        .catch((err)=>{
            res.status(500).send({
                message:"Unable to login. Try again later"
            });
        })
    })

router.route("/me")
    .get(verifyToken,(req,res)=>{
        db.User.findById(req.userId,{password:0})
       .then((user)=>{
            res.status(200).send(user);
        })
        .catch((err)=>{
            res.status(500).send({
                message:"Unable to retrieve user" + JSON.stringify(err)
            });
        })
    })
    
//Logout
router.get('/logout', function(req, res) {
        res.status(200).send({ auth: false, token: null });
});

module.exports=router;