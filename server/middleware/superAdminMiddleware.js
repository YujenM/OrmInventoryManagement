const { where } = require('sequelize');
const{User,Role}=require('../models');
const { includes } = require('lodash');
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
            through:'userRole',
            attributes:['name'],
        }]
    });
    if(!existingUser){
        return res.status(400).json({
            Error:'SuperAdmin not found'
        });
    }
    const roles=existingUser.Roles?existingUser.Roles.map(role=>role.name):[];
    if(!roles.includes('superAdmin')){
        return res.status(403).json({
            error:'Unauthorized: User doesnot have SuperAdmin privilages'
        })
    }
}

module.exports=isSuperAdmin;