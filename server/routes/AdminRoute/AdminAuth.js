const express=require('express');
const router=express.Router();
const { controller } = require('../../controllers/AdminSignupController/SignupController');

console.log(controller)
router.route('/signup').post(controller);


module.exports=router