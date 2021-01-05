'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth_order.belongsTo(models.oauth);
      models.oauth_order.hasMany(models.oauth_order_item);
    }
  };
  oauth_order.init({
    userId: DataTypes.INTEGER,
    deliveryTime: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    date: DataTypes.STRING,
    state : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'oauth_order',
  });
  return oauth_order;
};