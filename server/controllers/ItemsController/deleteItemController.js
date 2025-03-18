const deleteItemService=require('../../services/createItemsServices/deleteItem');

const deleteItemController=async(req,res)=>{
    try{
        const userId=req.decoded.id;
    if(!userId){
        return res.status(400).json({
            error:'UnAuthorized: UserId not found in token'
        })
    }
    const { id: itemId } = req.params; 
    const response = await deleteItemService(itemId, userId);
    return res.status(200).json(response);

    }catch(err){
        return res.status(500).json({
            error:err.message||"Internal Server Error"
        })
    }
}

module.exports={deleteItemController}