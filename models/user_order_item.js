'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_order_item.belongsTo(models.user_order);
      models.user_order_item.belongsTo(models.item);
    }
  };
  user_order_item.init({
    orderId : DataTypes.INTEGER,
    itemId : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_order_item',
  });
  return user_order_item;
};