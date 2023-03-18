const User = require('../models/User');
const mongoose = require('mongoose');
const Post = require('../models/Post');

const fs = require('fs');
const path = require('path');






exports.RegisterUser= async (req, res) => {
    if(req.body){
        try{
            const {email}=req.body;
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }
            else{
                const userwrite = User.create(req.body);
                res.json({
                    success: true,
                    data: userwrite,
                    message: "User created successfully"
                });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Server error'});
        }
    }
    else{
        res.status(400).json({message: 'Please enter all fields'});
    }

}


exports.LoginAuth = async (req,res)=>{
    
    try{
        const {email,password}=req.body;       
        const data = await User.findOne({email,password});
        if(data){
            const{passwords,...others} = data._doc;
            const posts = await Post.find();
            res.json({
                success: true,
                user: others,
                posts: posts,
                id: data._id,
                message: "Login Successful"
            });
        }
        else{
            res.json({
                success: false,
                message: "User does not exist"
            });
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

exports.updatepic = async (req,res)=>{
    try{
        const id = req.params.id;
        const photoPath = path.join(__dirname, '../public/images', req.file.filename);
        const photoData = fs.readFileSync(photoPath);
        let ImageObject={
            fileName:req.file.filename,
            data:photoData,
            contentType:req.file.mimetype
            
        }
        const data = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
            { image: ImageObject },
            { new: true }
        );
        if(!data){
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }
        const {password, ...others} = data._doc;
        return res.json({
            success: true,
            message: "Image updated successfully",
            userdata: others
        });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.GetbyId = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user){
            const{password,...others} = user._doc;
            
            res.json({
                success: true,
                users: others,
                message: "User found"
            });
        }
        else{
            res.send(user)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

exports.getallusers = async (req,res)=>{
    try{
        const user= await User.find();
        if(user){
            const obj = user.map((item)=>{
                const{password,...others} = item._doc;
                return others;
            })
            res.json({
                success: true,
                users: obj,
                message: "Users found"
            });
        }
        else{
            res.send(user)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

exports.ChangePassword = async (req,res)=>{
    const user = await User.findById(req.params.id);   
    if(req.body.oldpassword===user.password){
        try{
            const newuser = await User.findByIdAndUpdate({
                _id:req.params.id
            },{password:req.body.newpassword})
            if(newuser){
                res.json({
                    success:true,
                    message:"succesfully updated password"

                })
            }
            else{
                res.json({
                    success:false,
                    message:"error while updating"
                })
            }
        }
        catch(err){
            res.json({
                success:false,
                message:"couldnot update"
            })

        }
    }
    else{
        res.json({
            message:"Please enter correct old password"
        })
    }

}




