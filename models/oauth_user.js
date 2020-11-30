"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class oauth_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth_user.hasOne(models.oauth_user_market);
      models.oauth_user.hasMany(models.oauth_user_order);
    }
  }
  oauth_user.init(
    {
      mobile: DataTypes.STRING,
      address: DataTypes.STRING,
      brand: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "oauth_user",
    }
  );
  return oauth_user;
};
