const express=require('express');
const router=express.Router();
const { controller } = require('../../controllers/AdminSignupController/SignupController');
const{signupController}=require('../../controllers/AdminSignupController/LoginController');
const{createItemcontroller}=require('../../controllers/ItemsController/createItemController');
const{updateItemController}=require('../../controllers/ItemsController/updateItemController');
const{deleteItemController}=require('../../controllers/ItemsController/deleteItemController');
const isAdmin=require('../../middleware/adminMiddleware');


router.route('/signup').post(controller);
router.route('/login').post(signupController)
router.route('/createItem').post(isAdmin,createItemcontroller);
router.route('/updateItem/:id').put(updateItemController);
router.route('/deleteItem/:id').delete(deleteItemController);

module.exports=router;