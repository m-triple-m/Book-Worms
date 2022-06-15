const express = require("express");
const router = express.Router();
const Model = require("../models/userModel").userModel;

router.post("/add", (req, res) => {
  new Model(req.body)
    .save()
    .then((data) => {
      console.log("User data saved successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/verify", (req, res) => {
  let formdata = req.body;

  Model.findOne({ email: formdata.email })
    .populate("connections")
    .then((data) => {
      if (data) {
        console.log("data found");
        if (data.password === formdata.password) {
          console.log("login successfull");
          res.status(200).json(data);
        } else {
          console.log("password not matched");
          res.status(300).json({ status: "fail" });
        }
      } else {
        console.log("data not found");
        res.status(300).json({ status: "fail" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  
  Model.find({})
    .then((data) => {
      console.log("User data saved successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getbyemail/:email", (req, res) => {
  Model.findOne({ email: req.params.email })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put("/pushupdate/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, { $push: req.body }, { new: true })
    .populate("connections")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = { router };
