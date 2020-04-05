'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  return Admin;
};
