const updateService=require('../../services/OrderSevices/updateOrder');
const updateOrderController=async(req,res,next)=>{
    try{
        const userId=req.decoded?.id;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            });
        }
        const {orderId}=req.params;
        const {quantity}=req.body;
        if(!orderId || !quantity){
            return res.status(400).json({
                success:false,
                message:"Order ID (in URL) and quantity (in body) are required"
            });
        }
        const result=await updateService(userId,orderId,quantity);
        return res.status(200).json(result);

    }catch(err){
        next(err);
    }
}

module.exports={updateOrderController}