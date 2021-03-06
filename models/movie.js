'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Vote)
      Movie.hasMany(models.View)
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.STRING,
    artists: DataTypes.STRING,
    genres: DataTypes.STRING,
    watchURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};