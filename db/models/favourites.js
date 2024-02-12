'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('../index')

const favouritesInit = (sequelize, DataTypes) => {
  class Favourites extends Model {}
  Favourites.init({}, {
    sequelize,
    modelName: 'Favourites',
    freezeTableName: true
  });
  return Favourites;
};

module.exports = favouritesInit(connection, DataTypes)