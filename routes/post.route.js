const express = require("express")
const { PostModel } = require("../models/post.model")
const postRouter = express.Router()
const jwt = require("jsonwebtoken")

postRouter.get("/",async(req,res)=>{
    try{
        const posts = await PostModel.find()
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.post("/add",async(req,res)=>{
     
      try{
        const post = new PostModel(req.body)
         await post.save()
         res.status(200).send({"msg":"A Post is Added"})
          }catch(err){
            res.status(400).send({"msg":err.message})
          }
})

module.exports={
    postRouter
}