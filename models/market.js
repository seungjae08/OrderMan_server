"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.market.hasOne(models.oauth_user_market);
      models.market.hasOne(models.user_market);
      models.market.hasOne(models.unknown_market);
    }
  }
  market.init(
    {
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "market",
    }
  );
  return market;
};
