const{User,Role}=require('../models');

const isSuperAdmin=async(req,res)=>{
    const userid=req.decoded.id;
    if(!userid){
        return res.status(401).json({
            Error:"UnAuthorized: No Id found in token"
        });
    }
    const existingUser=User.findOne({
        where:{id:userid},
        include:[{
            model:Role,
            where:{name:'superAdmin'},
            through:'userRole',
            attributes:['name'],
        }]
    });
    if(!existingUser){
        return res.status(400).json({
            Error:'Unauthorized: SuperAdmin not found'
        });
    }

}

module.exports=isSuperAdmin;