var express=require("express");
var app=express();

var bodyParser=require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var users=require('./routes/users');
var roommateRequests=require('./routes/roommateRequests')

app.get("/",(req,res)=>{
    res.send("Welcome to Roommate Finder API Server")
})

app.use("/api/users",users);
app.use("/api/roommaterequests",roommateRequests)

app.listen(8000,()=>{
    console.log("Server is started")
})