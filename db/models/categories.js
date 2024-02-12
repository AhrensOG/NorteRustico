"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const categoriesInit = (sequelize, DataTypes) => {
  class Categories extends Model {}
  Categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
      freezeTableName: true,
    }
  );
  return Categories;
};

module.exports = categoriesInit(connection, DataTypes);
