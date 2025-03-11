'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsToMany(models.role,{
        through:models.userRole,
        foreignKey:'userId',
        otherKey:'roleId'
      })

    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    address:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps:true,
    hooks:{
      beforeCreate:async(user)=>{
        if(user.password){
          const salt=10;
          user.password=await bcrypt.hash(user.password,salt);
        }
      }
    }
  });
  return User;
};