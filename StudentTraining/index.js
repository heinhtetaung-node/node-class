const express = require('express')
const app = express()
const port = 3000

const { db } = require('./Models/index.js');
const Student = require('./Models/Student.model.js');
db.sequelize.sync();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3000/user/select
app.get('/user/select', async (req, res) => {
    // Student.getAll()
    const users = await Student.findAll();
    console.log(users)
    res.send(users);
})

// http://localhost:3000/user/add
// { name : '', age : '' } POST
app.post('/user/add', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    // const id = user.length + 1
    try {
        // await sequelize.query(`INSERT INTO student (id, name, age) VALUES (NULL, '${name}', '${age}')`);
        await Student.create({
            name,
            age
            // name : name,
            // age : age
        })
    } catch (err) {
        console.log(err)
        return res.send({ result : false })
    }    
    res.send({ result : true });
})

// http://localhost:3000/user/update/{id}
// { name : '' } PUT
app.patch('/user/update/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    // check in student tabale where id = id
    // const singleUser = await sequelize.query(`SELECT * FROM student WHERE id = ${id}`, { type : QueryTypes.SELECT });
    const singleUser = await Student.findByPk(id)
    console.log(singleUser)
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    // update table
    // const sql = `UPDATE student SET name = '${name}', age = '${age}' WHERE id = ${id}`;
    try {
        // await sequelize.query(sql, { type : QueryTypes.UPDATE });
        await Student.update({
            name,
            age
        },{
            where: {
              id
            }
        })
    } catch (err) {
        console.log(err)
        return res.send({
            result : false
        })
    }
    res.send({
        result : true
    })
})

// http://localhost:3000/user/remove/{id}
app.delete('/user/remove/:id', async (req, res) => {
    const id = req.params.id;
    // check in student tabale where id = id
    // const singleUser = await sequelize.query(`SELECT * FROM student WHERE id = ${id}`, { type : QueryTypes.SELECT });
    const singleUser = await Student.findByPk(id)
    console.log(singleUser)
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    try {
        // await sequelize.query(`DELETE FROM student WHERE id = ${id}`)
        await Student.destroy({
            where: {
              id // id : id
            }
        })
    } catch (err) {
        console.log(err)
        return res.send({
            result : false
        })
    }
    res.send({
        result : true
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})