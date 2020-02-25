'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cartId: DataTypes.INTEGER,
    totalAmount: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};