var express=require('express');
var router=express.Router();
var db=require('../db')

router.post("/register",(req,res)=>{
    res.send("registered");
})

router.post("/login",(req,res)=>{
    res.send("login");
})

module.exports=router;