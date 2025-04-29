const { User, Order, orderItem, Item, sequelize } = require('../../models');
const { ValidationError } = require('../../errors'); 
const redisClient=require('../../config/redis');


const addOrderServices = async (userId, items) => {
    const transaction=await sequelize.transaction();
    const checkExistingUser=await User.findByPk(userId);
    if(!checkExistingUser){
        await transaction.rollback();
        throw new ValidationError("User with this UserId not found in the database",401);
    }
    for(const item of items){
        const cacheKey = `order:${userId}:item:${item.itemId}`;
        const cachedOrder=await redisClient.get(cacheKey);
        if(cachedOrder){
            throw new ValidationError(`You have already ordered item ID: ${item.itemId}`);
        }


        // check in Database if user had already ordered
        const checkOrder=await orderItem.findOne({
            where:{
                itemId:item.itemId,
            },
            include:[
                {
                    model:Order,
                    where:{userId},
                    attributes:['id'],
                }
            ],
            transaction

        });
        if(checkOrder){
            throw new ValidationError(`Item with ID ${item.itemId} has already been ordered `,400);
        }
        const findItem=await Item.findByPk(item.itemId)
        if (!findItem || findItem.stock<item.quantity){
            await transaction.rollback();
            throw new ValidationError(`Item with this item id ${item.itemId} is not available or insufficient`);
        }
        findItem.stock -=item.quantity
        await findItem.save({transaction});
    }
    const order=await Order.create({userId},{transaction});
    const orderItems= items.map(item=>({
        orderId:order.id,
        itemId:item.itemId,
        quantity:item.quantity,
    }));
    await orderItem.bulkCreate(orderItems,{transaction});
    for(const item of items){
        await redisClient.set(`order:${userId}:item:${item.itemId}`,'ordered','EX',3600);

    }
    await transaction.commit();
    return{
        order
    }


};

module.exports = addOrderServices;
