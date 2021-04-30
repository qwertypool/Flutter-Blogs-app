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

router.route("/:username").get((req,res)=>{
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
        if (err) res.status(500).json({msg:err});
        if (result === null){
            res.status(403).json("Username Incorrect");
        }
        if (result.password === req.body.password){
            res.json("ok");
        }
        else{
            res.status(403).json("password is incorrect");
        }
    });
});

router.route("/update/:username").patch((req,res) => {
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

router.route("/delete/:username").delete((req,res)=>{
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
