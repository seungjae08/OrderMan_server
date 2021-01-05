'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth.hasOne(models.oauth_market);
      models.oauth.hasMany(models.oauth_order);
    }
  };
  oauth.init({
    mobile: DataTypes.STRING,
    userId:DataTypes.STRING,
    address: DataTypes.STRING,
    brand: DataTypes.STRING,
    birth: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oauth',
  });
  return oauth;
};