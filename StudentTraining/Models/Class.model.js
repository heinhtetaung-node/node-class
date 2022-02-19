const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');

class Classes extends Model {}

Classes.init({
  teacher_id : DataTypes.INTEGER,
  course_id : DataTypes.INTEGER,
  start_date : DataTypes.DATE
},  { sequelize, modelName: 'classes' });

module.exports = Classes