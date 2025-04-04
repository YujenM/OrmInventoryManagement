const{User,Order,orderItem,Item}=require('../../models');
const {ValidationError}=require('../../errors');


const getOrderServices=async(userId)=>{
    const checkExistingUser=await User.findByPk(userId);
    if(!checkExistingUser){
        throw new ValidationError(`User not found`,400);
    }
    const findOrders=await Order.findAll({
        where:{userId},
        include:[
            {
                model:Item,
                attributes:['id','name','price','description'],
                through:{
                    model:orderItem,
                    attributes:['quantity']
                }
            }
        ],
        Order:[['createdAt','DESC']],
    });
    if(findOrders.length===0){
        return {
            message:"No orders found for this user",
            orders:[]
        }
    }
    return findOrders;
    
}

module.exports=getOrderServices;

