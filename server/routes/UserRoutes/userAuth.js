const express=require('express');
const router= new express.Router();

const{controller}=require('../../controllers/UserSignupController/Signup');
const{Logincontroller}=require('../../controllers/userloginController/login');

router.route('/signup').post(controller);
router.route('/login').post(Logincontroller);


module.exports=router