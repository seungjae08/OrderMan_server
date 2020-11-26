"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_market.belongsTo(models.user);
      models.user_market.belongsTo(models.market);
    }
  }
  user_market.init(
    {
      userId: DataTypes.INTEGER,
      marketId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_market",
    }
  );
  return user_market;
};
