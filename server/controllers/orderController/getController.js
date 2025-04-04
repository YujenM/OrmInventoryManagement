const getOrderService=require('../../services/OrderSevices/getOrder');
const getOrderController=async(req,res,next)=>{
    try{
        const userId=req.decoded?.id;
        if(!userId){
            return res.status(400).json({
                status:false,
                message:"Invalid UserID"
            });
        }
        const response=await getOrderService(userId);
        res.status(200).json(response)

    }catch(err){
        next(err);
    }
}

module.exports={getOrderController};