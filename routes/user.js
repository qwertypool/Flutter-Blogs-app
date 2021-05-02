const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const config = require("../config")
const jwt = require("jsonwebtoken");
const { equal } = require("node:assert");
const middleware = require("../middleware");

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

router.route("/:username").get(middleware.checkToken, (req,res)=>{
User.findOne(
    {username:req.params.username},(err,result)=>{
        if (err) return res.status(500).json({msg:err});
        res.json ({
            data : result,
            username : req.params.username,
        });
    });
});

router.route("/login").post((req,res)=>{
    User.findOne({username:req.body.username},(err,result)=>{
        if (err) return res.status(500).json({msg:err});
        if (result === null){
          return  res.status(403).json("Username Incorrect");
        }
        if (result.password === req.body.password){
            let token = jwt.sign({usename:req.body.username},config.key,{expiresIn:"24h"});
          res.json({
              token:token,
              msg:"Successfull!"
          });
        }
        else{
           return res.status(403).json("password is incorrect");
        }
    });
});

router.route("/update/:username").patch(middleware.checkToken,(req,res) => {
    console.log("entered")
    User.findOneAndUpdate(
        {username:req.params.username},
        {$set:{password:req.body.password}},
        (err,result)=>{
            if (err) return res.status(500).json({msg:err});
            const msg = {
                msg : "Password updated successfully",
                username : req.params.username,
            };
            return res.json(msg);
        }
    );

});

router.route("/delete/:username").delete(middleware.checkToken,(req,res)=>{
    User.findOneAndDelete(
        {username:req.params.username}, (err,result)=>{
            if (err) return res.status(500).json({msg:err});
            const msg = {
                msg:"User deleted successfully",
                username : req.params.username,
            };
            return res.json(msg)
        }
        
    )
});
module.exports = router;
