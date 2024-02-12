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
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true
      },
      streetNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      flat: {
        type: DataTypes.STRING,
        allowNull: true
      },
      apartament: {
        type: DataTypes.STRING,
        allowNull: true
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true
      },
      locality: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
      
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
