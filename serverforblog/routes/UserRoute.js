const express = require('express');
const router = express.Router();
const multer = require('multer');

// const storage =multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'./public/images');
//     }
//     ,
//     filename: function(req,file,cb){
//         cb(null,file.originalname);
//     }
// });

// const upload = multer({storage:storage});

//using cloudinary
// Configuration 

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profilePicture',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp', 'jfif']
    }
});
const upload = multer({ storage: storage });


const {RegisterUser,LoginAuth,updatepic, GetbyId,getallusers,ChangePassword, followController} = require('../controllers/User');

router.post('/register', RegisterUser);
router.post('/login', LoginAuth);
router.put('/profile/:id',upload.single("file"),updatepic);
router.get('/user/:id',GetbyId);
router.get('/users',getallusers);
router.put('/changepassword/:id',ChangePassword);
router.put('/user/follow/:id',followController);



module.exports = router;
