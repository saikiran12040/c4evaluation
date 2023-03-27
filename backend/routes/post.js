const {Post}=require("../models/post");
const {Router}=require("express");
const postRouter=Router()

postRouter.get("/",async(req,res)=>{
    try{
        const {userId}=req.body;
        const {device=["Tablet","Laptop","Mobile"]}=req.query;
        const posts=await Post.find({$and:[{userId},{device:{$in:device}}]});
        res.json({posts,msg:"your posts"})
    } catch (error) {
        res.send(error.message);
    }
});

postRouter.get("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const post=await Post.findById(id);
        res.send({post})
    } catch (error) {
        res.send({msg:error.message});
    }
});

postRouter.post ("/",async(req,res)=>{
    try{
        const data=req.body;
        const newpost=new Post(data);
        await newpost.save();
        res.send({msg:"post created",post:newpost})
    } catch (error) {
        res.send(error.message);
    }
});

postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const data=req.body;
        const id=req.params.id;
        const updated=await Post.findByIdAndUpdate(id,data);
        res.send({msg:"post updated",post:updated});
    } catch (error) {
        res.send({msg:error.message});
    }
});

postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const deleted=await Post.findByIdAndDelete(id);
        if(deleted){
            res.send({msg:"post deleted",post:deleted});
        } else {
            res.send({msg:"post not found"});
        }
    } catch (err) {
        res.send({msg:error.message});
    }
})

module.exports={postRouter}