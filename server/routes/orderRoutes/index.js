const express=require('express');
const router=express.Router();
const{addOrdercontroller}=require('../../controllers/orderController/addController');
const{getOrderController}=require('../../controllers/orderController/getController');
const{updateOrderController}=require('../../controllers/orderController/updateController');
const {deleteOrderController}=require('../../controllers/orderController/deleteController');

router.post('/orderItems/:itemId',addOrdercontroller);
router.get('/getOrder',getOrderController);
router.put('/updateOrder/:orderId',updateOrderController);
router.delete('/deleteOrder/:orderId',deleteOrderController)
module.exports=router;


