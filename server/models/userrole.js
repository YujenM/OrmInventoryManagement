'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {
    
    static associate(models) {
      userRole.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:"CASCADE",
        onUpdate:'CASCADE'
      });
      userRole.belongsTo(models.Role,{
        foreignKey:'roleId',
        onDelete:'CASCADE',
        onUpdate:"CASCADE"
      })
    }
  }
  userRole.init({
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      
    },
    roleId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'userRole',
  });
  return userRole;
};