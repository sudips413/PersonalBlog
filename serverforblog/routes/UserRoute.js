const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/images');
    }
    ,
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage:storage});

const {RegisterUser,LoginAuth,updatepic, GetbyId,getallusers,ChangePassword} = require('../controllers/User');

router.post('/register', RegisterUser);
router.post('/login', LoginAuth);
router.put('/profile/:id',upload.single("file"),updatepic);
router.get('/user/:id',GetbyId);
router.get('/users',getallusers);
router.put('/changepassword/:id',ChangePassword);



module.exports = router;
