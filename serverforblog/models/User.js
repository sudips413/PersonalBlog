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
        fileName:{
            type:String,
            default:""
        },
        data:{
            type:Buffer,
            default:""
        },
        contentType:{
            type:String,
            default:""
        },
        required:true

    }
});




module.exports = mongoose.model('User', User);