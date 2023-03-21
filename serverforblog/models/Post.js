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
    
        // },
        image:{
            type:String,
            default:""
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
        },
        comment:{
            type:Array,
            default:[{
                username:"",
                comment:"",
                userid:"",
                image:""
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
                //     required:true
                // }

            }],
            required:false
        },
        likes:{
            type: Number,
            default:0,
        },
        views:{
            type: Number,
            default:0,
        }
    }
);


module.exports = mongoose.model('Post', Post);


