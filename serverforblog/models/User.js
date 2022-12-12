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
        required: false,
    }
});




module.exports = mongoose.model('User', User);