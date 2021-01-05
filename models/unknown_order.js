'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unknown_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.unknown_order.belongsTo(models.unknown);
      models.unknown_order.hasMany(models.unknown_order_item);
    }
  };
  unknown_order.init({
    userId: DataTypes.INTEGER,
    deliveryTime: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    state : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'unknown_order',
  });
  return unknown_order;
};