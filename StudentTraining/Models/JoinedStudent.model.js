const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');

class JointedStudent extends Model {}

JointedStudent.init({
  student_id : DataTypes.INTEGER,
  class_id : DataTypes.INTEGER  
},  { sequelize, modelName: 'jointedstudent' });

module.exports = JointedStudent