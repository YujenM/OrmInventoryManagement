const {User,Order,sequelize}=require('../../models');

const {ValdiationError}=require('../../errors');


const deleteOrderService=async(userId,orderId)=>{
    console.log("Here---->")
    const transaction=await sequelize.transaction();
    const checkExistingUser=await User.findByPk(userId);
    if(!checkExistingUser){
        transaction.rollback();
        throw new ValdiationError(`User with this ${userId} not found`,401);
    }
    const order=await Order.findOne({
        where:{
            id:orderId,
            userId
        },
        transaction
    });
    if(!order){
        transaction.rollback();
        throw new ValidationError(`order with this ${orderId} not found`,404);
    }
    await order.destroy({transaction});
    await transaction.commit();
    return {
        success:true,
        message:`Order with this ${orderId} deleted successfully`
    }
}

module.exports=deleteOrderService;