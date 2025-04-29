const deleteOrderService=require('../../services/OrderSevices/deleteOrder');

const deleteOrderController=async(req,res,next)=>{
    try{
        const userId=req.decoded?.id;
        console.log("User ID--->"+userId);
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            });
        }
        const {orderId}=req.params;
        if(!orderId){
            return res.status(400).json({
                success:false,
                message:"Order ID is required"
            });
        }
        const result=await deleteOrderService(userId,orderId);
        console.log("here--->"+ result);
        return res.status(200).json(result); 

    }catch(err){
        next(err);
    }
}
module.exports={deleteOrderController}