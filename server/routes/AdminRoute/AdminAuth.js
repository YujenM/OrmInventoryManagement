const express=require('express');
const router=express.Router();
const { controller } = require('../../controllers/AdminSignupController/SignupController');
const{signupController}=require('../../controllers/AdminSignupController/LoginController');
console.log(controller)
router.route('/signup').post(controller);
router.route('/login').post(signupController)

module.exports=router