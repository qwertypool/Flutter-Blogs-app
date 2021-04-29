const express = require("express");
const User = require("../models/user.model");

const router = express.Router();
router.route("/register").post((req,res)=>{
    console.log("In the register page");
    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
    });
    user
    .save()
    .then(()=>{
        console.log("Registration successful");
        res.status(200).json("ok");
    })
    .catch((err)=>{
        res.status(403).json({msg:err});
    });

});
module.exports = router;