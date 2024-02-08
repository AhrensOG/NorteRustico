"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const orderProductsInit = (sequelize, DataTypes) => {
  class OrderProducts extends Model {}
  OrderProducts.init(
    {
      productName: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      status: DataTypes.ENUM('Shopping', 'Pending', 'Paid', 'Cancel'),
    },
    {
      sequelize,
      modelName: "OrderProducts",
      freezeTableName: true,
    }
  );
  return OrderProducts;
};

module.exports = orderProductsInit(connection, DataTypes);
