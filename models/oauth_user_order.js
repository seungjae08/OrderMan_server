'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth_user_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth_user_order.belongsTo(models.oauth_user);
      models.oauth_user_order.hasMany(models.oauth_user_order_item);

    }
  };
  oauth_user_order.init({
    user_id: DataTypes.INTEGER,
    deliveryTime: DataTypes.STRING,
    paymentMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oauth_user_order',
  });
  return oauth_user_order;
};