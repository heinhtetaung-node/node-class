import express, { Request, Response } from "express"
const router = express.Router()
import { check, ValidationError, validationResult, Result } from "express-validator"
import { ClassTypeInput, ClassTypeOutput } from '../Models/Class.model'
import { createClass, allClass, updateClass, deleteClass } from '../Repositories/ClassRepo'

// http://localhost:3000/class
interface Courses {
    success: boolean,
    datas: ClassTypeOutput[] | null
} 

router.get('/class', async(req: Request, res: Response<Courses>) => {
        try {
            const result = await allClass()
            res.send({ success: true, datas: result })
        } catch (error: unknown) {
            res.status(500).send({ success : false, datas : null  })
        }
    }
)

// http://localhost:3000/class/add
interface ClassCreate {
    success : boolean
    datas ?: ClassTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/class/add', 
    check('teacher_id').notEmpty().withMessage('teacher_id is required').isInt().withMessage('teacher_id must be numeric'),
    check('course_id').notEmpty().withMessage('course_id is required').isInt().withMessage('course_id must be numeric'),
    async (req : Request<ClassTypeInput>, res : Response<ClassCreate>) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ success : false, validateError: errors  })

        const teacher_id: number = req.body.teacher_id
        const course_id: number = req.body.course_id

        try {
            const result = await createClass({ course_id, teacher_id })
            res.send({ success: true, datas: result })
        } catch (error) {
            console.log(error)
            return res.send({ success: false })
        }
    }
)

// http://localhost:3000/class/edit/:id
interface EditClass extends ClassCreate {
    message ?: string
}

router.patch('/class/edit/:id', async(req: Request, res: Response<EditClass>) => {
    const id: number = parseInt(req.params.id)
    const teacher_id: number = req.body.teacher_id
    const course_id: number = req.body.course_id

    try {
        const result = await updateClass({ id, teacher_id, course_id })
        if (!result) {
            return res.send({ success: false, message: 'Product not found!' })
        }
        res.send({ success: true, datas: result })
    } catch (error) {
        return res.send({ success: false })
    }
})

// http://localhost:3000/class/delete/:id
interface DeleteClass extends ClassCreate {
    message ?: string
}

router.delete('/class/delete/:id', 
    async(req: Request, res: Response<DeleteClass>) => {
        const id: number = parseInt(req.params.id)
        try{
            const result = await deleteClass(id)
            const message = !result ? "Product not found" : undefined
            res.send({ success: result, message })
        }catch (err) {
            return res.send({ success: false })
        }
    }
)
export default router