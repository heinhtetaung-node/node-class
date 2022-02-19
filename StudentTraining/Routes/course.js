const express = require('express')
const router = express.Router()
const Course = require('../Models/Course.model')
const {check, validationResult} = require('express-validator')

// http://localhost:3000/course
router.get('/course', async (req, res) => {
    const course = await Course.findAll()
    console.log(course)
    res.send(course)
})

// http://localhost:3000/course/add
router.post('/course/add', 
    check('fees').notEmpty().withMessage('age is required').isInt().withMessage('age must be numeric'),
    check('coursename').notEmpty().withMessage('course name is required'),
    check('courseduration').notEmpty().withMessage('course duration is required'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const fees = req.body.fees
        const coursename = req.body.coursename
        const courseduration = req.body.courseduration

        try {
            await Course.create({
                fees,
                coursename,
                courseduration
            })
        } catch (error) {
            console.log(error)
            return res.send({ result : false})
        }

        res.send({ result : true })
})

// http://localhost:3000/course/update/:id
router.patch('/course/update/:id', 
    check('fees').notEmpty().withMessage('age is required').isInt().withMessage('age must be numeric'),
    check('coursename').notEmpty().withMessage('course name is required'),
    check('courseduration').notEmpty().withMessage('course duration is required'),
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const id = req.params.id
        const fees = req.body.fees
        const coursename = req.body.coursename
        const courseduration = req.body.courseduration

        const singleUser = await Course.findByPk(id)
        if (singleUser.length == 0) {
            return res.send({
                result : false,
                message : 'User not found!'
            })
        }

        try {
            await Course.update({
                fees,
                coursename,
                courseduration
            }, { where: {
                id
            }})
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

// http://localhost:3000/course/remove/{id}
router.delete('/course/remove/:id', async (req, res) => {
    const id = req.params.id
    const singleUser = await Course.findByPk(id)

    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }

    try {
        await Course.destroy({
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