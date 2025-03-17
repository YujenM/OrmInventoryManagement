'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    static associate(models) {
      orderItem.belongsTo(models.Order,{
        foreignKey:'orderId'
      });
      orderItem.belongsTo(models.Item,{
        foreignKey:'itemId'
      });
    }

  }
  orderItem.init({
    itemId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Item',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    orderId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Order',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'orderItem',
  });
  return orderItem;
};