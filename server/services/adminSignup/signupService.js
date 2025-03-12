const { Model, where } = require('sequelize');
const{User,Role,userRole, sequelize}=require('../../models');

const signupService=async(userData)=>{
    const transaction =await sequelize.transaction();
    const checkexistinguser=await User.findOne({
        where:{
            email:userData.email
        },
        transaction
    });
    if(checkexistinguser){
        await transaction.rollback();
        throw new Error('User Email Already Exists in the Database');
    }
    const newUser=await User.create(userData,{transaction});
    const userRoleData=await Role.findOne({
        where:{
            name:'admin'
        },
        transaction
    });
    if(!userRole){
        await transaction.rollback();
        throw new Error('Role not Found');
    };
    await userRole.create({
        userId:newUser.id,
        roleId:userRoleData.id
    },{transaction});
    await transaction.commit();
    return {
        message:"Admin Created Succesfully",
        Admin:newUser
    }


}

module.exports=signupService;