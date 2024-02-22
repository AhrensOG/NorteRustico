"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const productInit = (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      discount: DataTypes.INTEGER,
      fewUnits: DataTypes.BOOLEAN,
      limitedOffer: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER,
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      heigth: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      large: DataTypes.INTEGER,
      weight: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Product",
      freezeTableName: true,
    }
  );
  return Product;
};

module.exports = productInit(connection, DataTypes);
