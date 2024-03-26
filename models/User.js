'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
      }
    };
    User.init({
      username: DataTypes.STRING,
      role: DataTypes.ENUM('ADMIN', 'USER')
    }, {
      sequelize,
      modelName: 'User',
    });
    return User;
  };