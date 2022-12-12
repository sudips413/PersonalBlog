const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');




exports.RegisterUser= async (req, res) => {
    if(req.body){
        try{
            const {email}=req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }
            else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass
                });
                console.log(newUser);
                const userwrite = User.create(newUser);          
                res.json({
                    success: true,
                    data: newUser,
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
        res.status(400).json({message: 'All fields are required'});
    }

}


exports.LoginAuth = async (req,res)=>{
    const {email} = req.body;
    const user = await User.findOne ({email});
    if(user){
       
        try{
            !user && res.status(400).json({message:"User not found"});
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword && res.status(400).json({message:"Wrong password"});
            if(validPassword){                
                res.json({
                success: true,
                username: user.name,
                id: user._id,
                message: "Login Successful"
                });
            }
            else{
                res.json({
                    success: false,
                    message: "Login failed"
                });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Server error'});
        }
    }
    else{
        res.status(400).json({message: 'user doesnt exist'});
    }
}

exports.updatepic = async (req,res)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const data = await User.findByIdAndUpdate({
            _id:id
        },{ 
            image:req.file.path
        });
        const {password, ...others} = data._doc;
        if(data){
            console.log(data);
            res.json({
                success: true,
                message: "Image updated successfully",
                userdata: others
                
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

    }
}

exports.GetbyId = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        if(user){
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
        const users = await User.find();
        const {password, ...others} = users._doc;
        if(users){
            res.json({
                success: true,
                users: others,
                message: "Users found"
            });
        }
        else{
            res.send("No users found")
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
                    newuser:newuser,
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




