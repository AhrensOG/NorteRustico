"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const orderInit = (sequelize, DataTypes) => {
  class Order extends Model {}
  Order.init(
    {
      orderId: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      status: DataTypes.ENUM('Shopping', 'Pending', 'Paid', 'Cancel'),
      totalPrice: DataTypes.DECIMAL(10, 2),
      deliveryCost: DataTypes.DECIMAL(10, 2),
      cartPrice: DataTypes.DECIMAL(10, 2),
      discountedCartPrice: DataTypes.DECIMAL(10, 2), 
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email: DataTypes.TEXT,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      street: DataTypes.STRING,
      streetNumber: DataTypes.INTEGER,
      flat: DataTypes.STRING,
      apartament: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      dni: DataTypes.STRING,
      phone: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Order",
      freezeTableName: true,
    }
  );
  return Order;
};

module.exports = orderInit(connection, DataTypes);
