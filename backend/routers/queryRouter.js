const router=require('express').Router();
const Model=require('../models/queryModel').queryModel;

router.post('/addquery',(req,res)=>{

    new Model(req.body)
    .save()
    .then((data) => {
      console.log("user query saved successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
    
});

router.get('/getall',(req,res)=>{

    Model.find({}).populate("user")
      .then((data) => {
        console.log("product data fetched successfully..");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });

});

router.get('/getbyqueryid/:id',(req,res)=>{

  const id=req.params.id;
  Model.findById(id).populate('user').then((data)=>{

    console.log("query data fetched successfully");
    res.status(200).json(data);
  
  }).catch((err)=>{

    console.log(err);
    res.status(500).json(err);
    
  });

});


router.get('/get/:id',(req,res)=>{

  const id=req.params.id;

  Model.find({user:req.params.id})
    .then((data) => {
      console.log("query data fectched successfully..");
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
    console.log("query data updated successfully..");
    res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });

});


module.exports={router};
