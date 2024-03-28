'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });

      Rating.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  Rating.init(
    {
      classify: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[0, 1, 2, 3, 4]]
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Rating',
      paranoid: true
    },
  );

  return Rating;
};