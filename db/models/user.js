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
      email: DataTypes.STRING,
      profileImage: DataTypes.TEXT,
      phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
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
