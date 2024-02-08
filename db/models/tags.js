"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const tagsInit = (sequelize, DataTypes) => {
  class Tags extends Model {}
  Tags.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tags",
      freezeTableName: true,
    }
  );
  return Tags;
};

module.exports = tagsInit(connection, DataTypes);
