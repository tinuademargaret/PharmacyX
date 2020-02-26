'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.BLOB,
    description: DataTypes.TEXT,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Cart, {
      foreignKey: 'cart_id'
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
  };
  return Product;
};