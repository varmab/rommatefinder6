var db=require('./db')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const resolvers={
    Query:{
        allRequests:()=>{
            return new Promise((resolve,reject)=>{
               db.RoommateRequest.find({},(err,requests)=>{
                   if(err) reject(err);
                   resolve(requests);
               })
            })
        }
    },
    Mutation:{
        login:()=>{
            return new Promise((resolve,reject)=>{
                //database logic here
            })
        },
        register:(_,args)=>{
            console.log(JSON.stringify(args.user));
            return new Promise((resolve,reject)=>{
                //encrypt password before save
                var hashedPassword=bcrypt.hashSync(args.user.password, 8);
            
                var newUser=new db.User({
                    name:args.user.name,
                    email:args.user.email,
                    phone:args.user.phone,
                    password:args.user.password
                });
                
                newUser.save((err,user)=>{
                    console.log(JSON.stringify(err))
                    if(err) reject(err)
                    //create jwt token
                    var token = jwt.sign({ id: user._id },
                        'secret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    console.log(token);
                    resolve({auth:true,token: token});
                })
            })
        },
        createRequest:()=>{
            return new Promise((resolve,reject)=>{
                //database logic here
            })
        }
    }
}

module.exports=resolvers;