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
                where: { name: { [Op.in]: ['admin', 'superadmin'] } },
                through:'userRole',
                attributes:['name'],
            }]
        });
        if (!exsitinguser) {
            return res.status(403).json({ error: "Unauthorized: Admin or Superadmin access required" });
        }
        req.user = existingUser;
        next();

    }catch(err){
        res.status(500).json({
            Error:"Internal Server Error"
        });
    }
}

module.exports=checkisAdmin