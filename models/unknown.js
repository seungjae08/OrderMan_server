'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unknown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.unknown.hasMany(models.unknown_order);
      models.unknown.hasOne(models.unknown_market);
    }
  };
  unknown.init({
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    brand: DataTypes.STRING,
    birth: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'unknown',
  });
  return unknown;
};