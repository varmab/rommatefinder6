var express=require('express');
var router=express.Router();
var db=require('../db')

router.route("/")
    .get((req,res)=>{
        db.RoommateRequest.find({},(err,requests)=>{
            if(err) res.status(500).send(err);
            res.status(200).send(requests)
        })
    })
    .post((req,res)=>{
        var newRequest=new db.RoommateRequest(req.body);
        newRequest.save((err,request)=>{
            if(err) res.status(500).send(err);
            res.status(200).send(request)
        })
    })

router.route("/search/:area/:city")
    .get((req,res)=>{
        var area=req.params.area;
        var city=req.params.city
        db.RoommateRequest.find({area:area,city:city},(err,requests)=>{
            if(err) res.status(500).send(err);
            res.status(200).send(requests)
        })
    })

module.exports=router;