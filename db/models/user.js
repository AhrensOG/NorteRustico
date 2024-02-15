"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const userInit = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.TEXT,
        autoIncrement: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      street: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      streetNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      flat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apartament: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};

module.exports = userInit(connection, DataTypes);
