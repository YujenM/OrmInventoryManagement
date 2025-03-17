'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.User,{
        foreignKey:'userId'
      });
      Item.belongsToMany(models.Order,{
        through:models.orderItem,
        foreignKey:'itemId',
        otherKey:'orederId'
      })

    }
  }
  Item.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL(10,3),
      allowNull:false
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'User',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};