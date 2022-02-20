const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');
const Student = require('./Student.model');
const Classes = require('./Class.model');
class JointedStudent extends Model {}

JointedStudent.init({
  student_id : DataTypes.INTEGER,
  class_id : DataTypes.INTEGER  
},  { sequelize, modelName: 'jointedstudent' });

JointedStudent.belongsTo(Student,  {as: 'Student', foreignKey: 'student_id'});
JointedStudent.belongsTo(Classes, {as: 'Classes', foreignKey: 'class_id'});
module.exports = JointedStudent