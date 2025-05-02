const{Item}=require('../../models');
const createItemService=async({name,description,price,stock,userId,image})=>{
    if(!userId){
        throw new Error('UserId not found');
    }
    console.log(userId)
    const createItem=await Item.create({
        name,
        description,
        price,
        stock,
        userId,
        itemImage:image
    })
    return{
        message:"Item Created Succesfully",
        item:createItem

    }
}

module.exports=createItemService;