const express=require('express');
const router=express.Router();
const Model=require('../models/checkoutModel').checkoutModel;

router.post('/buy',(req,res)=>{


    new Model(req.body)
    .save()
    .then((data) => {
      console.log("checkout data saved successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

});

module.exports={router};