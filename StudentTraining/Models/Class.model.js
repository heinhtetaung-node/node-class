const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');
const Course = require('./Course.model');
const Teacher = require('./Teacher.model');

class Classes extends Model {}

Classes.init({
  teacher_id : DataTypes.INTEGER,
  course_id : DataTypes.INTEGER,
  start_date : DataTypes.DATE
},  { sequelize, modelName: 'classes' });

Classes.belongsTo(Course, {as : 'course', foreignKey : 'course_id'})
Classes.belongsTo(Teacher, {as : 'teacher', foreignKey : 'teacher_id'})
Teacher.hasMany(Classes, {as : 'classes', foreignKey : 'teacher_id'})

module.exports = Classes