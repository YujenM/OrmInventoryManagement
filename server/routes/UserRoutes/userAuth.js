const express=require('express');
const router= new express.Router();

const{controller}=require('../../controllers/UserSignupController/Signup');


router.route('/signup').post(controller);

module.exports=router