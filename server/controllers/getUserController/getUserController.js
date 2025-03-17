const getUserService=require('../../services/getUserService/servicec');
const controller=async(req,res)=>{
    try{
        const userID=req.decoded.id;
    if(!userID){
        return res.status(400).json({
            error:"User not found of this userId"
        });
    }
    const getUser=await getUserService(userID);
    return res.status(200).json(getUser);

    }catch(err){
        return res.status(500).json({
            error:err.message||'User not found'
        });
    }

}

module.exports={controller};
