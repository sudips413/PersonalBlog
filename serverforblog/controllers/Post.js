
const Post = require('../models/Post');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.CreatePost = async (req,res)=>{

    if(req.body){
        const photoPath = path.join(__dirname, '../public/images', req.file.filename);
        const photoData = fs.readFileSync(photoPath);
        const post =new Post({
            title:req.body.title,
            description:req.body.description,
            image:{
                fileName:req.file.filename,
                data:photoData,
                contentType:req.file.mimetype
            },
            userid:new mongoose.Types.ObjectId(req.body.userid),
            username:req.body.username
        });
        await post.save().then((data)=>{
            res.status(200).json({
                success:true,
                data:post,
                message:"Post added successfully"
            })
        }).catch((err)=>{
            res.status(500).json({
                success:false,
                message:err.message
            })
        })

    }
}

exports.ShowPosts = async(req,res)=>{
    try{
        const posts = await Post.find();
        //arrange the posts in descending order according to date
        posts.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        })        
        res.send(posts);
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.DeletePost = async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"Post deleted successfully",
            datadeletd:post
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.UpdatePost = async(req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            post.title=req.body.title;
            post.description=req.body.description;
            post.userid= new mongoose.Types.ObjectId(req.body.userid);
            post.username=req.body.username;
            const updatedpost = await post.save();
            res.json({
                success:true,
                message:"Post updated successfully",
                data:updatedpost
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }



   
}

