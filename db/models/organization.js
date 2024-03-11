"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const organizationInit = (sequelize, DataTypes) => {
  class Organization extends Model {}
  Organization.init(
    {
      name: DataTypes.STRING,
      whatsAppLink: DataTypes.TEXT,
      instagramLink: DataTypes.TEXT,
      facebookLink: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Organization",
      freezeTableName: true,
      paranoid: true,
    }
  );
  return Organization;
};

module.exports = organizationInit(connection, DataTypes);
