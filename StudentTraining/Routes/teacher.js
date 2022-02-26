const express = require('express')
const router = express.Router()
const Course = require('../Models/Course.model')
const Class = require('../Models/Class.model')
const Teacher = require('../Models/Teacher.model')
const {check, validationResult} = require('express-validator')
const { sequelize } = require('../Models/index');
const { QueryTypes } = require('sequelize');

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

router.get('/teachers/courses/:id', async (req, res) => {
    const id = req.params.id

    // const sql = `
    // SELECT 
    //   t.*,
    //   co.*
    // FROM teachers AS t
    
    // LEFT JOIN classes AS c
    // ON c.teacher_id = t.id
    // LEFT JOIN courses AS co
    // ON co.id = c.course_id

    // WHERE t.id = ${id}
    // GROUP BY co.id
    // `;

    // const data = await sequelize.query(sql, { type : QueryTypes.SELECT })
    
    const data = await Teacher.findOne({
        where : { id }, // = { id : id }
        include : [{
            model : Class, 
            attributes : ['id'],
            as : "classes",
            include : [{ 
                model: Course,
                attributes: ['fees', 'coursename', 'courseduration'],
                as: "course"
            }]
        }]
    })

    res.send({
        result : true,
        datas : data
    })
})

module.exports = router