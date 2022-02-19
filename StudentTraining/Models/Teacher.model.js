const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./index')

class Teacher extends Model{}

Teacher.init({
    teacherfees: DataTypes.INTEGER,
    name: DataTypes.STRING,
    qualitification: DataTypes.TEXT,
}, {sequelize, modelName: 'teachers'})

module.exports = Teacher