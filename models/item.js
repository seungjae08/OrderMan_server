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
      models.item.hasOne(models.order_item);
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
