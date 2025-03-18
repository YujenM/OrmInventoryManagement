const{User,Role}=require('../models');

const checkisAdmin=(req,res)=>{
    try{
        const userId=req.decoded.id;
        if(!userId){
            res.status(401).json({
                Error:"Unauthorized: No userId found in AuthToken"
            });
        }
        const exsitinguser=User.findOne({
            where:{id:userId},
            include:[{
                model:Role,
                through:'userRole',
                attributes:['name'],
            }]
        });
        if(!exsitinguser){
            res.status(400).json({
                Error:'User Not found'
            })
        }
        const roles=exsitinguser.Roles? exsitinguser.Roles.map(role=>role.name):[];
        if(!roles.includes('admin')&& !roles.includes('superAdmin')){
            res.status(403).json({
                error:"UnAuthorized : User doesnot have privilages of Admin or superAdmin"
            })
        };
        next();

    }catch(err){
        res.status(500).json({
            Error:"Internal Server Error"
        });
    }
}

module.exports=checkisAdmin