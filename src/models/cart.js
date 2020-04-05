'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cart_id = DataTypes.STRING,
    totalAmount: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Order,{
      foreignKey: 'cart_id' 
     }),
    Cart.belongsTo(models.User,{
      foreignKey: 'cart_id' 
     }),
     Cart.hasMany(models.Product, {
      foreignKey: 'cart_id',
      as: 'products'
    });
       
  };
  return Cart;
};