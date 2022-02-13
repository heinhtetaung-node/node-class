
const express = require("express");
const router = express.Router();
const Student = require('../Models/Student.model.js');

// http://localhost:3000/user/select
router.get('/user/select', async (req, res) => {
    // Student.getAll()
    const users = await Student.findAll();
    console.log(users)
    res.send(users);
})

// http://localhost:3000/user/add
// { name : '', age : '' } POST
router.post('/user/add', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    try {
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
router.patch('/user/update/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const singleUser = await Student.findByPk(id)
    console.log(singleUser)
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    try {
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
router.delete('/user/remove/:id', async (req, res) => {
    const id = req.params.id;
    const singleUser = await Student.findByPk(id)
    console.log(singleUser)
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    try {
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

module.exports = router