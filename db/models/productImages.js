"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const productImagesInit = (sequelize, DataTypes) => {
  class ProductImages extends Model {}
  ProductImages.init(
    {
      name: DataTypes.TEXT,
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ProductImages",
      freezeTableName: true,
    }
  );
  return ProductImages;
};

module.exports = productImagesInit(connection, DataTypes);
