const{User,Order,orderItem,Item,sequelize}=require('../../models');
const {ValidationError}=require('../../errors');

const updateOrderService=async(userId,orderId,quantity)=>{
    const transaction=await sequelize.transaction();
    const checkExistingUser=await User.findByPk(userId);
    // if(checkExistingUser){
    //     const checkOrder=await Order.findOne({
    //         where:{
    //             id:orderId,
    //             userId
    //         },
    //         transaction
            
    //     })
    //     if(!checkOrder){
    //         await transaction.rollback();
    //         throw new ValidationError(`Order with this ${orderId} not found`);
    //     }
    //     const checkItem=await orderItem.findOne({
    //         where:{
    //             orderId,
    //         },
    //         include:[
    //             {
    //                 model:Item,
    //                 attributes:['id','stock'],
    //                 where:{
    //                     stock:{
    //                         [Op.gte]:quantity
    //                     }
    //                 }
    //             }

    //         ],
    //         transaction
    //     })
    //     if(!checkItem){
    //         await transaction.rollback();
    //         throw new ValidationError(`Item with this ${orderId} not found`)
    //     }
    //     await orderItem.update(quantity);
    // }
    if (!checkExistingUser){
        throw new ValidationError(`User with this ${userId} not found`,401);
    }
    const order=await Order.findOne({
        where:{
            id:orderId,
            userId
        },
        transaction
    });
    if(!order){
        await transaction.rollback();
        throw new ValidationError(`Order with this ${orderId} not found`,404)
    }
    const checkItem=await orderItem.findOne({
        where:{
            orderId,
        },
        include:[
            {
                model:Item,
                attribute:['id','stock'],
            }
        ],
        transaction
    })
        
    if(!checkItem){
        await transaction.rollback();
        throw new ValidationError(`Item with this ${orderId} not found`,404)
    }
    if(checkItem.Item.stock<quantity){
        await transaction.rollback();
        throw new ValidationError("Insufficient stock",400);
    }
    await orderItem.update({
        quantity
    },{
        where:{
            orderId,
            itemId:checkItem.Item.id
        },
        transaction
    })
    await transaction.commit();
    return {
        success:true,
        message:"Order updated successfully",
        data:{
            orderId,
            quantity
        }
    }
}

module.exports=updateOrderService;
