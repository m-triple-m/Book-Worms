
const { default: mongoose } = require('mongoose');
const moongoose=require('../connection');

const mySchema=new moongoose.Schema({
    title:String,
    description:String,
    genre:String,
    thumbnail:String,
    author:String,
    user:{type:mongoose.Types.ObjectId,ref:"users"},
    price:Number,
    rentPrice:Number,
    rentable:Boolean,
    exchangeble:Boolean,
    createdAt:{type:Date,default:new Date()},
});


const novelModel=moongoose.model('novels',mySchema);

module.exports={novelModel};