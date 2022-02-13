const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');

class Student extends Model {}

Student.init({
  name : DataTypes.STRING,
  // name : {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },

  age : DataTypes.INTEGER
},  { sequelize, modelName: 'students' });

module.exports = Student

// const StudentModel = (sequelize) => {

//   class Student extends Model {}

//   Student.init({
//     name : DataTypes.STRING,

//     // name : {
//     //   type: DataTypes.STRING,
//     //   allowNull: false
//     // },

//     age : DataTypes.INTEGER
//   },  { sequelize, modelName: 'students' });

//   return Student;

// }
// modules.exports = StudentModel