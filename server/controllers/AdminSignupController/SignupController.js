const signupService=require('../../services/adminSignup/signupService');
const controller=async(req,res)=>{
    try{
        const{name,email,password,address}=req.body;
        if(!name||!email||!password||!address){
            return res.status(400).json({
                error:"Please Fill all the fileds"
            });
        }
        const response=await signupService({name,email,password,address});
        return res.status(201).json(response);

    }catch(err){
        return res.status(500).json({
            error:err.message||'Signup Failed',
        })
    }
};

module.exports={controller};