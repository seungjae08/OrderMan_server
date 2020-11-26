"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class oauth_user_market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth_user_market.belongsTo(models.oauth_user);
      models.oauth_user_market.belongsTo(models.market);
    }
  }
  oauth_user_market.init(
    {
      userId: DataTypes.INTEGER,
      marketId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "oauth_user_market",
    }
  );
  return oauth_user_market;
};
