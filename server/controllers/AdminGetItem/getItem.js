const adminGetItem=require('../../services/admimGetItems/getItems');
const getItemController=async(req,res,next)=>{
    try{
        const userId=req.decoded.id;
        console.log(userId);
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        } 
        const response=await adminGetItem.getItems(userId);
        return res.status(200).json({
            success:true,
            response:response
        });

    }catch(err){
        next(err);        
    }
}

module.exports={
    getItemController
}