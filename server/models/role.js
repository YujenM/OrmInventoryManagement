'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate(models) {
      Role.belongsToMany(models.User,{
        through:models.userRole,
        foreignKey:'roleId',
        otherKey:'userId'
      })
    }
  }
  Role.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps:false
  });
  return Role;
};