const express=require('express');
const router=express.Router();
const{itemController}=require('../../controllers/ItemsController/fetchallItems');
router.route('/getItems').get(itemController);
module.exports=router