const { default: mongoose } = require('mongoose');
const moongoose=require('../connection');

const mySchema=new moongoose.Schema({
    
    title:String,
    thumbnail:String,
    description:String,
    user:{type:mongoose.Types.ObjectId,ref:"users"},
    isresolved:{type:Boolean,default:false},
    createdAt:{type:Date,default:new Date()},
});

const queryModel=moongoose.model('query',mySchema);
module.exports={queryModel};

