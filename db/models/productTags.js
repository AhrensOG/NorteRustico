'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('../index')

const productTagsInit = (sequelize, DataTypes) => {
  class ProductTags extends Model {}
  ProductTags.init({}, {
    sequelize,
    modelName: 'ProductTags',
    freezeTableName: true
  });
  return ProductTags;
};

module.exports = productTagsInit(connection, DataTypes)