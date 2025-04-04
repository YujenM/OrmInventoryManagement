const express=require('express');
const router=express.Router();
const{addOrdercontroller}=require('../../controllers/orderController/addController');
const{getOrderController}=require('../../controllers/orderController/getController');

router.post('/orderItems/:itemId',addOrdercontroller);
router.get('/getOrder',getOrderController);

module.exports=router;
