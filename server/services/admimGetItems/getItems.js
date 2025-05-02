const {User,Item}=require('../../models');
const{validationError}=require('../../errors');

const getItems=async(userId)=>{
    const existinguser=await User.findOne({
        where:{
            id:userId
        }
    });
    if(!existinguser){
        throw new validationError(`User not found with id ${userId}`);
    }
    const getitem =await Item.findAll({
        where:{
            userId:userId
        }
    });
    if(!getitem){
        throw new validationError(`Item not found with id ${userId}`);
    }
    return getitem;
    
}

module.exports={
    getItems
}