"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.item.hasMany(models.user_order_item);
      models.item.hasMany(models.unknown_order_item);
      models.item.hasMany(models.oauth_user_order_item);
    }
  }
  item.init(
    {
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};
