const {User,Role}=require('../../models');
const getUserService=async(userId)=>{
    console.log("Userid: "+userId);
    const existingUser=await User.findOne({
        where:{
            id:userId
        },
        attributes:['id','name','email','address','createdat'],
        include:[{
            model:Role,
            through:'userRole',
            attributes:['name']
        }]
    });
    if(!existingUser){
        throw new Error('User not found');
    }
    const { Roles, ...userwithwoutroles } = existingUser.toJSON();
    const roles=existingUser.Roles.map(role=>role.name);
    return{
        message:"Sucess",
        user:{
            userwithwoutroles,
            Roles:roles
        }
    }

}
module.exports=getUserService;