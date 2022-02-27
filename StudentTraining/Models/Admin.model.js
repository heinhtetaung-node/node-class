const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');
 
class Admin extends Model {}

Admin.init({
  userName : DataTypes.STRING,
  email : DataTypes.STRING,
  password : DataTypes.STRING
},  { sequelize, modelName: 'admin' });

module.exports = Admin 