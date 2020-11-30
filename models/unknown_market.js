'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unknown_market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.unknown_market.belongsTo(models.unknown);
      models.unknown_market.belongsTo(models.market);

    }
  };
  unknown_market.init({
    user_id: DataTypes.INTEGER,
    market_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unknown_market',
  });
  return unknown_market;
};