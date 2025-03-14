const express=require('express');
const router=express.Router();

const {loginController}=require('../../controllers/SuperAdminController/login');


router.route('/login').post(loginController);


module.exports=router;