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
            required:false
    
        },
        date: {
            type: Date,
            default: Date.now
        },
        userid:{
            type:String,
            required:false
        },
        username:{
            type:String,
            required:true
        }
    }
);


module.exports = mongoose.model('Post', Post);


