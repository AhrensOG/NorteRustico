"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const qualificationsInit = (sequelize, DataTypes) => {
  class Qualifications extends Model {}
  Qualifications.init(
    {
      point: DataTypes.ENUM("1", "2", "3", "4", "5"),
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "Qualifications",
      freezeTableName: true,
    }
  );
  return Qualifications;
};

module.exports = qualificationsInit(connection, DataTypes);
