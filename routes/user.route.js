const express = require("express")
const {UserModel} = require("../models/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city,is_married}=req.body
    try{
        bcrypt.hash(password, 4, async(err, hash)=> {
            const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"Registration Done"})
        });
        
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
  try{
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password, (err, result) =>{
            if(result){
                res.status(200).send({"msg":"Login success","token":jwt.sign({"userId":user._id}, 'fullstack')})
            }else{
                req.status(400).send({"msg":"Wrong credentials"})
            }
        });
       
    }
  }catch(err){
    req.status(400).send({"msg":err.message})
  }
})

module.exports={
    userRouter
}