var mongoose=require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL);

//create schema and model for User
var userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: String,
    phone: String,
    password: String
})

exports.User=mongoose.model('User',userSchema,'users');

var roommateRequestSchema=mongoose.Schema({
    area:String,
    city: String,
    gender:String,
    rent:Number,
    numberOfRoommates:Number,
    photo:String,
    userId:mongoose.SchemaTypes.ObjectId
})

exports.RoommateRequest=mongoose.model('RoommateRequest',roommateRequestSchema,'requests')