'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User,{
        foreignKey:'userId'
      });
      Order.belongsToMany(models.Item,{
        through:models.orderItem,
        foreignKey:'orderId'
      })
    }
  }
  Order.init({
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'User',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    orderDate: {
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};