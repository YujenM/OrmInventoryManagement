const express=require('express');
const router=express.Router();
const { controller } = require('../../controllers/AdminSignupController/SignupController');
const{signupController}=require('../../controllers/AdminSignupController/LoginController');
const{createItemcontroller}=require('../../controllers/ItemsController/createItemController');
const{updateItemController}=require('../../controllers/ItemsController/updateItemController');
const{deleteItemController}=require('../../controllers/ItemsController/deleteItemController');
const {getItemController}=require('../../controllers/AdminGetItem/getItem');
const {getOrderController}=require('../../controllers/AdminGetOrder/getOrder');
const isAdmin=require('../../middleware/adminMiddleware');
const upload=require('../../middleware/cloudinary');

router.route('/signup').post(controller);
router.route('/login').post(signupController)
router.post("/createItem",isAdmin ,upload.single("itemImage"), createItemcontroller);
router.route('/updateItem/:itemId').put(isAdmin, upload.single("itemImage"), updateItemController);
router.route('/deleteItem/:id').delete(deleteItemController);
router.route('/getAdminItem').get(isAdmin,getItemController);
router.route('/getAdminOrder').get(isAdmin,getOrderController);

module.exports=router;