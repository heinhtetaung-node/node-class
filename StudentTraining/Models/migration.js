const { Sequelize, QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('./index');
(async () => {
    await sequelize.sync();
    await new Promise(resovle => setTimeout(resovle, 3000)) // wait 3000s
    const Admin = require('./Admin.model.js')
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('admin', salt, async (err, hash) => {        
            Admin.create({
                userName : 'Admin',
                email : 'admin@gmail.com',
                password : hash
            })
            // Admin.bulkCreate([
            //     {
            //         userName : 'Admin',
            //         email : 'admin@gmail.com',
            //         password : hash
            //     },
            //     {
            //         userName : 'Admin2',
            //         email : 'admin2@gmail.com',
            //         password : hash
            //     }
            // ])
        })
    })    
    
    // Other table seeding available
})();