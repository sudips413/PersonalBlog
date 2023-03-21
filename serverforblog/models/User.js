const mongoose = require('mongoose');


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image:{
        type:String,
        default:""
    }
    ,
    followings:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    }
    // image:{
    //     fileName:{
    //         type:String,
    //         default:""
    //     },
    //     data:{
    //         type:Buffer,
    //         default:""
    //     },
    //     contentType:{
    //         type:String,
    //         default:""
    //     },
    //     required:false

    // }
});




module.exports = mongoose.model('User', User);