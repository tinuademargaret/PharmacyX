'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};