const updateitemService=require('../../services/createItemsServices/updateItem.js');
const updateItemController=async(req,res)=>{
    try{
        const userId=req.decoded.id;
        const {id}=req.params;
        const updateData=req.body
        const updatedItem = await updateitemService(userId, id, updateData);
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    }catch(err){
        res.status(500).json({
            Error:err.message||'Internal Server Erorr'
        })
    }
}

module.exports={updateItemController};
