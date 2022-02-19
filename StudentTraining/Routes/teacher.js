const express = require('express')
const router = express.Router()
const Teacher = require('../Models/Teacher.model')
const {check, validationResult} = require('express-validator')

// http://localhost:3000/teachers
router.get('/teachers', async(req, res) => {
    const teachers = await Teacher.findAll()
    console.log(teachers)
    res.send(teachers)
})

// http://localhost:3000/teachers/add
router.post('/teachers/add', 
    check('teacherfees').notEmpty().withMessage('fees is required').isInt().withMessage('fees must be numeric'),
    check('name').notEmpty().withMessage('teacher name is required'),
    check('qualitification').notEmpty().withMessage('qualitification is required'),    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const teacherfees = req.body.teacherfees
        const name = req.body.name
        const qualitification = req.body.qualitification

        try {
            await Teacher.create({
                teacherfees,
                name,
                qualitification
            })
        } catch (error) {
            console.log(error)
            return res.send({ result: false })
        }
        return res.send({ result : true })
    })


// http://localhost:3000/teachers/update/id
router.patch('/teachers/update/:id', 
    check('teacherfees').notEmpty().withMessage('fees is required').isInt().withMessage('fees must be numeric'),
    check('name').notEmpty().withMessage('teacher name is required'),
    check('qualitification').notEmpty().withMessage('qualitification is required'), 
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        
        const id = req.params.id
        const teacherfees = req.body.teacherfees
        const name = req.body.name
        const qualitification = req.body.qualitification

        const signleTeacher = await Teacher.findByPk(id)
        if (signleTeacher.length == 0) {
            return res.send({
                result : false,
                message : 'User not found!'
            })
        }

        try {
            await Teacher.update({
                teacherfees,
                name,
                qualitification
            }, {
                where: {id}
            })
        } catch (error) {
            console.log(err)
            return res.send({
                result : false
            })
        }

        res.send({
            result : true
        })
})

// http://localhost:3000/teachers/remove/{id}
router.delete('/teachers/remove/:id', async (req, res) => {
    const id = req.params.id
    const singleUser = await Teacher.findByPk(id)
    
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }

    try {
        await Teacher.destroy({
            where: {id}
        })
    } catch (error) {
        console.log(error)
        return res.send({
            result : false
        })
    }
    res.send({
        result : true
    })
})

module.exports = router