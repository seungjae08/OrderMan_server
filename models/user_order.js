'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_order.belongsTo(models.user);
      models.user_order.hasMany(models.user_order_item);
    }
  };
  user_order.init({
    userId: DataTypes.INTEGER,
    deliveryTime: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    date: DataTypes.STRING,
    hopePrice: DataTypes.INTEGER,
    state : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_order',
  });
  return user_order;
};
