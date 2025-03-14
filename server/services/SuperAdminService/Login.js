const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const{User,Role}=require('../../models');

const LoginService=async (userData)=>{
    const checkexistinguser=await User.findOne({
        where:{email:userData.email},
        include:[{
            model:Role,
            through:'userRoles',
            attributes:['name']
        }]
    });
    if(!checkexistinguser){
        throw new Error('Invalid Credentials');
    }
    const checkpassword=await bcrypt.compare(userData.password,checkexistinguser.password);
    if(!checkpassword){
        throw new Error("Invalid Credentials");
    }
    const role= checkexistinguser.Roles.map(role=>role.name);
    if (!role.includes('superAdmin')){
        throw new Error('Acess Denied Only Super Admin can login');
    }
    const token=jwt.sign(
        {
            id:checkexistinguser.id,
            email:checkexistinguser.email
        },
        process.env.SECRET,
        {expiresIn:'1h'}
    )
    const{password,...sendwithoutpassword}=checkexistinguser.toJSON();
    return{
        message:"Login Succesful",
        user:{
            ...sendwithoutpassword,
            Roles:role
        },
        token
    }
}

module.exports=LoginService;
