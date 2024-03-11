"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const organizationImagesInit = (sequelize, DataTypes) => {
  class OrganizationImages extends Model {}
  OrganizationImages.init(
    {
      name: DataTypes.TEXT,
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "OrganizationImages",
      freezeTableName: true,
    }
  );
  return OrganizationImages;
};

module.exports = organizationImagesInit(connection, DataTypes);
