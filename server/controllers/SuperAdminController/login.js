const loginService=require('../../services/SuperAdminService/Login');

const loginController=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            res.status(400).json({
                Error:"Please Insert all the Fields"
            });
        }
        const response=await loginService({email,password});
        res.status(200).json(response);

    }catch(err){
        return res.status(500).json({
            Error:err.message||'Login Failed'
        })
    }
}

module.exports={loginController}