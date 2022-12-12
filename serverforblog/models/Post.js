const mongoose = require('mongoose');

const Post= new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        username:{
            type:String,
            required:true
        }
    }
);


module.exports = mongoose.model('Post', Post);


