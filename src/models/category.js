'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products'
    });
  };
  return Category;
};