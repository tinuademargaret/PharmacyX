'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    cardDetails: DataTypes.STRING,
    // cart: DataTypes.ARRAY,
    // order: DataTypes.ARRAY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'orders'
    });
  };
  return User;
};

