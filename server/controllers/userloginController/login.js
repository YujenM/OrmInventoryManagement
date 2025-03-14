const loginService=require('../../services/userLoginservice/login');
const Logincontroller=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                error:"Please Fill all the fields"
            });
        }
        const response=await loginService({email,password});
        return res.status(200).json(response);

    }catch(err){
        res.status(500).json({
            error:err.message || 'Login Failed'
        })
    }
}

module.exports={Logincontroller};