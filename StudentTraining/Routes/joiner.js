
const express = require("express");
const router = express.Router();
const Class = require('../Models/Class.model.js');
const Student = require('../Models/Student.model.js');
const { check, validationResult } = require('express-validator')
const JoinedStudent = require('../Models/JoinedStudent.model.js');
const { sequelize } = require('../Models/index');
const { QueryTypes } = require('sequelize');
const Teacher = require("../Models/Teacher.model.js");
const Course = require("../Models/Course.model.js");

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

router.get('/joiner/select', async (req, res) => {
  
  // const datas = await sequelize.query(`
  //   SELECT 
  //     jointedstudents.*,
  //     students.name,
  //     students.age,
  //     classes.start_date,
  //     classes.teacher_id,
  //     classes.course_id,
  //     teachers.teacherfees,
  //     teachers.name AS teacher_name,
  //     teachers.qualitification,
  //     courses.fees,
  //     courses.coursename,
  //     courses.courseduration
  //   FROM jointedstudents
  //     LEFT JOIN students
  //       ON jointedstudents.student_id = students.id
  //     LEFT JOIN classes
  //       ON jointedstudents.class_id = classes.id
  //     LEFT JOIN teachers
  //       ON classes.teacher_id = teachers.id
  //     LEFT JOIN courses
  //       ON classes.course_id = courses.id;
  //   `, { type: QueryTypes.SELECT });

  const datas = await JoinedStudent.findAll({
    include : [
      {
        model: Student,
        attributes: ['name', 'age'],
        as: "Student"
      },
      {
        model: Class,
        attributes: ['start_date', 'teacher_id', 'course_id'],
        as: "Classes",
        include : [
          {
            model : Teacher,
            attributes : ['teacherfees', 'name', 'qualitification'],
            as : "teacher"
          },
          {
            model : Course,
            attributes : ['fees', 'coursename', 'courseduration'],
            as : "course"
          }
        ]
      }
    ]
  });

  res.send({ result : true, datas })

})

module.exports = router

// HW: delete


// Q1. boss want to know number of students join on Java
// SELECT 
// count(js.id) AS numofstu
// FROM jointedstudents AS js

// LEFT JOIN classes AS cl
// ON js.class_id = cl.id
    
// LEFT JOIN courses AS co
// ON cl.course_id = co.id
    
// WHERE co.coursename = 'Java'


// Boss wants to know totalfees get from course
// CREATE VIEW AS sumFess
// SELECT 
// SUM(co.fees) AS numofstu
// FROM jointedstudents AS js

// LEFT JOIN classes AS cl
// ON js.class_id = cl.id
    
// LEFT JOIN courses AS co
// ON cl.course_id = co.id
    
// WHERE co.coursename = 'Java';


// Boss wants to know summary of course.
// SELECT c.*, 
// Func_totalfees(c.coursename) AS totalFees, 
// Func_numofstu(c.coursename) AS totalStus,
// from courses c


// Func_numofstu(? = java or php)
// BEGIN
// 	DECLARE numofstu INT;
//     SELECT 
//     count(js.id)
//     FROM jointedstudents AS js
    
//     LEFT JOIN classes AS cl
//     ON js.class_id = cl.id
        
//     LEFT JOIN courses AS co
//     ON cl.course_id = co.id
        
//     WHERE co.coursename = Stuname
    
//     INTO numofstu;
//     RETURN numofstu;
// END

// Func_totalfees(? = java or php)
// BEGIN
//   DECLARE totalFees INT;
//   SELECT 
//   SUM(co.fees)
//   FROM jointedstudents AS js

//   LEFT JOIN classes AS cl
//   ON js.class_id = cl.id
      
//   LEFT JOIN courses AS co
//   ON cl.course_id = co.id
      
//   WHERE co.coursename = Classname
  
//   INTO totalFees;
  
//   RETURN totalFees;
// END


// CREATE VIEW viewname AS Select ......