const express=require('express');
const router=express.Router();
const{addOrdercontroller}=require('../../controllers/orderController/addController');

router.post('/orderItems/:itemId',addOrdercontroller);
module.exports=router;
