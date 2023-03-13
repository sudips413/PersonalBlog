const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage});


const {CreatePost,ShowPosts,DeletePost, UpdatePost} = require('../controllers/Post');

router.post('/create',upload.single("file"),CreatePost);
router.get('/posts',ShowPosts);
router.delete('/delete/:id',DeletePost);
router.put('/update/:id',upload.single("file"),UpdatePost);



module.exports = router;