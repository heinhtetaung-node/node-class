const { Sequelize, QueryTypes } = require('sequelize');


const sequelize = new Sequelize('studenttraining2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// Promise 
new Promise(async(reslove, reject) => {
    try {
        await sequelize.authenticate();
        reslove('Connection has been established successfully.')
    } catch (error) {
        reject('Unable to connect to the database:')
    }
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

const db = {}
db.sequelize = sequelize
// db.student = require('./Student.model.js')(sequelize)
// module.export = db
module.exports = { db, sequelize }
