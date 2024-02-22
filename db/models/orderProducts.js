"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const orderProductsInit = (sequelize, DataTypes) => {
  class OrderProducts extends Model {}
  OrderProducts.init(
    {
      status: DataTypes.ENUM("Shopping", "Pending", "Paid", "Cancel"),
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      discount: DataTypes.INTEGER,
      items: DataTypes.INTEGER,
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
