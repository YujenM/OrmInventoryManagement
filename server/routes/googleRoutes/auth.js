const express=require('express');
const router=express.Router();
const authController=require('../../controllers/goggleAuth/authController');

router.get('/google',authController.googleAuth);
router.get('/google/callback',authController.googleCallback);
router.get('/logout',authController.logout);


module.exports=router;
