
const express = require("express");
const router = express.Router();
const Class = require('../Models/Class.model.js');
const Student = require('../Models/Student.model.js');
const { check, validationResult } = require('express-validator')
const JoinedStudent = require('../Models/JoinedStudent.model.js');

// http://localhost:3000/user/add
// { name : '', age : '' } POST
router.post('/joiner/add', 
    check('student_id')
        .notEmpty().withMessage('teacher_id is required')
        .isInt().withMessage('student_id must be numeric')
        .custom(value => {
            return Student.findByPk(value).then(student => {
              if (!student) { // teacher == null
                return Promise.reject('Student is not exist');
              }
            });
          }), // course_id also need to check like this Homework
    check('class_id')
        .notEmpty().withMessage('class_id is required')
        .isInt().withMessage('class_id must be numeric')
        .custom(value => {
            return Class.findByPk(value).then(classData => {
              if (!classData) { // teacher == null
                return Promise.reject('Class is not exist');
              }
            });
        })
        .custom((value, { req }) => {
            // select * from jointedstudents where class_id=1 and student_id=1;
            return JoinedStudent.findAll({ where : 
                { class_id : value, student_id : req.body.student_id }
            }).then(classData => {
              if (classData.length > 0) { // teacher `!= null
                return Promise.reject('This student already joined this class');
              }
            });
        }), 
    async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { student_id, class_id } = req.body
    // is equal to
    // const teacher_id = req.body.teacher_id
    // const course_id = req.body.course_id
    // const start_date = req.body.start_date
    
    try {
        await JoinedStudent.create({
            student_id,
            class_id,
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