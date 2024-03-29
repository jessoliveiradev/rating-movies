'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Model {
    static associate(models) {
      Movie.hasMany(models.Rating, { foreignKey: 'movieId' });
    }
  }
  Movie.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Movie',
      paranoid: true
    },
  );

  return Movie;
};