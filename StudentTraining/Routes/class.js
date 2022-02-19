
const express = require("express");
const router = express.Router();
const Class = require('../Models/Class.model.js');
const { check, validationResult } = require('express-validator')
const Teacher = require('../Models/Teacher.model.js');

// http://localhost:3000/user/add
// { name : '', age : '' } POST
router.post('/class/add', 
    check('teacher_id')
        .notEmpty().withMessage('teacher_id is required')
        .isInt().withMessage('teacher_id must be numeric')
        .custom(value => {
            return Teacher.findByPk(value).then(teacher => {
              if (!teacher) { // teacher == null
                return Promise.reject('Techer is not exist');
              }
            });
          }), // course_id also need to check like this Homework
    check('course_id').notEmpty().withMessage('course_id is required').isInt().withMessage('course_id must be numeric'),
    check('start_date').notEmpty().withMessage('start_date is required').isDate().withMessage('date must be YYYY-mm-dd'),
    async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { teacher_id, course_id, start_date } = req.body
    // is equal to
    // const teacher_id = req.body.teacher_id
    // const course_id = req.body.course_id
    // const start_date = req.body.start_date
    
    try {
        await Class.create({
            teacher_id,
            course_id,
            start_date
            // name : name,
            // age : age
        })
    } catch (err) {
        console.log(err)
        return res.send({ result : false })
    }    
    res.send({ result : true });
})

module.exports = router