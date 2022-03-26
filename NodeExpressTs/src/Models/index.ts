import { Sequelize, QueryTypes } from "sequelize";

const sequelize = new Sequelize('studenttraining3', 'root', 'root', {
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

export { sequelize }