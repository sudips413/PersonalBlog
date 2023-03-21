
const Post = require('../models/Post');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
exports.increaseView = async(req,res)=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success:false,
                message: "Invalid post ID"
            });
        }
        const post = await Post.findById(req.params.id);
        if(post){
            post.views = post.views + 1;
            await post.save().then((data)=>{
                res.status(200).json({
                    success:true,
                    data:post,
                    message:"View increased successfully"
                })
            }
            ).catch((err)=>{
                res.status(500).json({
                    success:false,
                    message:"error occured"
                })
            }
            )
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.increaseLike = async(req,res)=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success:false,
                message: "Invalid post ID"
            });
        }
        const post = await Post.findById(req.params.id);
        if(post){
            post.likes = post.likes + 1;
            await post.save().then((data)=>{
                res.status(200).json({
                    success:true,
                    data:post,
                    message:"Like increased successfully"
                })
            }
            ).catch((err)=>{
                res.status(500).json({
                    success:false,
                    message:err.message
                })
            }
            )
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.decreaseLike = async(req,res)=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success:false,
                message: "Invalid post ID"
            });
        }
        const post = await Post.findById(req.params.id);
        if(post){
            post.likes = post.likes-1;
            await post.save().then((data)=>{
                res.status(200).json({
                    success:true,
                    data:post,
                    message:"Like increased successfully"
                })
            }
            ).catch((err)=>{
                res.status(500).json({
                    success:false,
                    message:err.message
                })
            }
            )
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



exports.DeleteComment = async(req,res)=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success:false,
                message: "Invalid post ID"
            });
        }

        const post = await Post.findById(req.params.id);
        if(post){
            post.comment = [];
            await post.save().then((data)=>{
                res.status(200).json({
                    success:true,
                    data:post,
                    message:"Comment deleted successfully"
                })
            }
            ).catch((err)=>{
                res.status(500).json({
                    success:false,
                    message:err.message
                })
            }
            )
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



exports.updateComment = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            const comment = {
                username:req.body.username,
                comment:req.body.comment,
                userid:req.body.userid,
                image:req.body.image               
            }
            post.comment.push(comment);
            await post.save().then((data)=>{
                res.status(200).json({
                    success:true,
                    data:post,
                    message:"Comment added successfully"
                })
            }
            ).catch((err)=>{
                res.status(500).json({
                    success:false,
                    message:err.message
                })
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

exports.CreatePost = async (req,res)=>{

    if(req.body){
        // const photoPath = path.join(__dirname, '../public/images', req.file.filename);
        const photoData = req.file.path;
        const post =new Post({
            title:req.body.title,
            description:req.body.description,
            image:photoData,
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

