const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./index')

class Course extends Model{}

Course.init({
    fees: DataTypes.INTEGER,
    coursename: DataTypes.STRING,
    courseduration: DataTypes.TEXT,
}, { sequelize, modelName: 'courses' })

module.exports = Course