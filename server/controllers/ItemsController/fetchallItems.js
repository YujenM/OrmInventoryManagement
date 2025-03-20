const itemServices=require('../../services/createItemsServices/getallItems');

const itemController=async(req,res)=>{
    try{
        const response=await itemServices();
        res.status(200).json({
            success:true,
            response:response
        });

    }catch(err){
        res.status(500).json({
            error:err.message||'Internal server error'
        })
    }
}
module.exports={itemController};