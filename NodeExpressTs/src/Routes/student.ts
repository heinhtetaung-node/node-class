import express, { Request, Response } from "express";
const router = express.Router();
import { StudentTypeOutput, StudentTypeInput } from "../Models/Student.model"
import { findAllStudents, createStudent, getStudentDetail, updateStudent, deleteStudent } from "../Repositories/StudentRepo";
import { check, ValidationError, validationResult, Result } from "express-validator";
import { checkJwtMiddleware, RequestWithAuth } from "../Middlewares/CheckAdmin";

interface StudentGetAll {
    success : boolean
    datas : StudentTypeOutput[] | null
}
router.get('/student/select', 
    checkJwtMiddleware,
    async (req : RequestWithAuth<any>, res : Response<StudentGetAll>) => {
    try {
        const users = await findAllStudents();
        res.send({
            success : true,
            datas : users            
        });
    } catch (err : unknown) {
        console.log(err)        
        res.status(500).send({ success : false, datas : null })
    }
})

interface StudentCreate {
    success : boolean
    datas ?: StudentTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/student/add', 
    checkJwtMiddleware,
    check('name').notEmpty().withMessage('name is required'),
    check('age').notEmpty().withMessage('age is required').isInt().withMessage('age must be numeric'),
    async (req : RequestWithAuth<StudentTypeInput>, res : Response<StudentCreate>) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success : false,
            validateError: errors            
        });
    }
    
    const name : string = req.body.name
    const age : number = req.body.age
    try {
        const createdStudent = await createStudent({
            name,
            age
        })
        res.send({ success : true, datas : createdStudent });
    } catch (err : unknown) {
        console.log(err)
        return res.send({ success : false })
    }
})


interface StudentUpdate extends StudentCreate {
    message ?: string
}
router.patch('/student/update/:id', 
    check('name').notEmpty().withMessage('name is required'),
    check('age').notEmpty().withMessage('age is required').isInt().withMessage('age must be numeric'),
    async (req : Request<StudentTypeInput>, res : Response<StudentUpdate>) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ validateError: errors, success : false });    

    const id : number = req.params.id as number;
    const name : string = req.body.name;
    const age : number = req.body.age;

    try {
        const updatedStudent = await updateStudent({ id, name, age })
        if (updatedStudent === false) {
            res.send({
                success : false,
                message : 'User not found!'               
            })
        } else {
            res.send({
                success : true,
                datas : updatedStudent
            })
        }
    } catch (err : unknown) {
        console.log(err)
        return res.send({
            success : false,
            message : 'something-wrong'
        })
    }    
})

interface StudentDelete extends StudentCreate {
    message?: string
}
router.delete('/student/remove/:id', async (req : Request, res : Response<StudentDelete>) => {
    try {
        const id : number = parseInt(req.params.id)
        const result = await deleteStudent(id)
        const message = !result ? "user not found" : undefined;
        res.send({
            success : result,
            message
        })
    } catch (err : unknown) {
        console.log(err)
        return res.send({
            success : false
        })
    }    
})

export default router