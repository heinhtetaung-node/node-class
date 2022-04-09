import express, { Request, Response } from "express"
const router = express.Router()
import { check, ValidationError, validationResult, Result } from "express-validator"
import { JoinedStudentTypeInput, JoinedStudentTypeOutput } from '../Models/JoinedStudent.model'
import { createJoinedStudent, getJoinStudents, updateJoinedStudent, deleteJoinedStudent, GetJoinStudents }  from '../Repositories/JoinedStudentRepo'

// http://localhost:3000/join
interface Join {
    success: boolean,
    datas: JoinedStudentTypeOutput[] | null
} 

router.get('/joiner/select', async (req : Request, res : Response<GetJoinStudents>) => {
    
    getJoinStudents().then((result : any) => {
        return res.send(result)
    })
    // res.send({ result : true, [] })
  
})


// http://localhost:3000/joinedstudent/add
interface JoinedStudentCreate {
    success : boolean
    datas ?: JoinedStudentTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/joinedstudent/add', 
    check('student_id').notEmpty().withMessage('student_id is required').isInt().withMessage('student_id must be numeric'),
    check('class_id').notEmpty().withMessage('class_id is required').isInt().withMessage('class_id must be numeric'),
    async (req : Request<JoinedStudentTypeInput>, res : Response<JoinedStudentCreate>) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ success : false, validateError: errors  })

        const student_id: number = req.body.student_id
        const class_id: number = req.body.class_id

        try {
            const result = await createJoinedStudent({ student_id, class_id })
            res.send({ success: true, datas: result })
        } catch (error) {
            console.log(error)
            return res.send({ success: false })
        }
    }
)

// http://localhost:3000/join/edit/:id
interface EditJoin extends JoinedStudentCreate {
    message ?: string
}

router.patch('/join/edit/:id', async(req: Request, res: Response<EditJoin>) => {
    const id: number = parseInt(req.params.id)
    const student_id: number = req.body.student_id
    const class_id: number = req.body.class_id

    try {
        const result = await updateJoinedStudent({ id, student_id, class_id })
        if (!result) {
            return res.send({ success: false, message: 'Product not found!' })
        }
        res.send({ success: true, datas: result })
    } catch (error) {
        return res.send({ success: false })
    }
})

// http://localhost:3000/join/delete/:id
interface DeleteJoin extends JoinedStudentCreate {
    message ?: string
}
router.delete('/join/delete/:id', 
    async(req: Request, res: Response<DeleteJoin>) => {
        const id: number = parseInt(req.params.id)
        try{
            const result = await deleteJoinedStudent(id)
            const message = !result ? "Product not found" : undefined
            res.send({ success: result, message })
        }catch (err) {
            return res.send({ success: false })
        }
    }
)

export default router