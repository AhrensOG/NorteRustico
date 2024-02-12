'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('../index')

const productCategoriesInit = (sequelize, DataTypes) => {
  class ProductCategories extends Model {}
  ProductCategories.init({}, {
    sequelize,
    modelName: 'ProductCategories',
    freezeTableName: true
  });
  return ProductCategories;
};

module.exports = productCategoriesInit(connection, DataTypes)