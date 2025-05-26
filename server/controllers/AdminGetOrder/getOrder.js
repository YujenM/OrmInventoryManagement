const getOrder=require('../../services/adminGetorder/getOrder');

const getOrderController=async(req,res,next)=>{
    try{
        const adminId=req.decoded.id;
        console.log("This"+adminId);
        if(!adminId){
            return res.status(400).json({
                success:false,
                message:"Admin not found"
            });
        }
        const response=await getOrder(adminId);
        console.log(response);
        return res.status(200).json({
            success:true,
            response:response
        });
    }catch(err){
        next(err);
    }
}
module.exports={
    getOrderController
}