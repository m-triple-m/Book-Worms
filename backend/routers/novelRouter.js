const express=require('express');
const router=express.Router();
const Model=require('../models/novelModel').novelModel;

router.post('/add',(req,res)=>{
    new Model(req.body)
    .save()
    .then((data) => {
      console.log("product data saved successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

});

router.get('/getall',(req,res)=>{

    Model.find({}).populate('user')
      .then((data) => {
        console.log("product data fetched successfully..");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });

});

router.get('/getbyid/:id',(req,res)=>{

  const id=req.params.id;

  Model.findById(id).populate("user").then((data)=>{

    console.log("product fetched successfully");
    res.status(200).json(data);

  }).catch((err)=>{

    console.log(err);
    res.status(500).json(err);
    
  });

});

router.delete('/delete/:id',(req,res)=>{

const id=req.params.id;

Model.findByIdAndDelete(id).then((data) => {
  console.log("product data deleted successfully..");
  res.status(200).json(data);
})
.catch((err) => {
  console.error(err);
  res.status(500).json(err);
});

});


router.put('/update/:id',(req,res)=>{

  const id=req.params.id;
  Model.findByIdAndUpdate(id,req.body).then((data) => {
    console.log("novel data updated successfully..");
    res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });

});


router.get("/getbyuserid/:id", (req, res) => {
  Model.find({user:req.params.id})
    .then((data) => {
      console.log("novel data fectched successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports={router};
