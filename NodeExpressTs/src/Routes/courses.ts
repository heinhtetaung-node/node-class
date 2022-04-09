import express, { Request, Response } from "express"
const router = express.Router()
import { CoursesTypeInput, CoursesTypeOutput } from "../Models/Courses.model"
import { check, ValidationError, validationResult, Result } from "express-validator"
import { createCourse, allCourse, updateCourse, deleteCourse } from '../Repositories/CoursesRepo'

// http://localhost:3000/course
interface Teachers {
    success: boolean,
    datas: CoursesTypeOutput[] | null
} 

router.get('/course', async(req: Request, res: Response<Teachers>) => {
        try {
            const result = await allCourse()
            res.send({ success: true, datas: result })
        } catch (error: unknown) {
            res.status(500).send({ success : false, datas : null  })
        }
    }
)

// http://localhost:3000/course/add
interface CourseCreate {
    success : boolean
    datas ?: CoursesTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/course/add', 
    check('fees').notEmpty().withMessage('fees is required').isInt().withMessage('fees must be numeric'),
    check('coursename').notEmpty().withMessage('coursename is required'),
    check('courseduration').notEmpty().withMessage('courseduration is required'),
    async (req : Request<CoursesTypeInput>, res : Response<CourseCreate>) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ success : false, validateError: errors  })

    const fees: number = req.body.fees
    const coursename: string = req.body.coursename
    const courseduration: string = req.body.courseduration

    try {
        const result = await createCourse({ fees, coursename, courseduration })
        res.send({ success: true, datas: result })
    } catch (error) {
        console.log(error)
        return res.send({ success: false })
    }
})

// http://localhost:3000/course/edit/:id
interface EditCourse extends CourseCreate {
    message ?: string
}
router.patch('/course/edit/:id', async(req: Request, res: Response<EditCourse>) => {
    const id: number = parseInt(req.params.id)
    const fees: number = req.body.fees
    const coursename: string = req.body.coursename
    const courseduration: string = req.body.courseduration

    try {
        const result = await updateCourse({ id, fees, coursename, courseduration })
        if (!result) {
            return res.send({ success: false, message: 'Product not found!' })
        }
        res.send({ success: true, datas: result })
    } catch (error) {
        return res.send({ success: false })
    }
})

// http://localhost:3000/course/delete/:id
interface DeleteCreate extends CourseCreate {
    message ?: string
}
router.delete('/course/delete/:id', 
    async(req: Request, res: Response<DeleteCreate>) => {
        const id: number = parseInt(req.params.id)
        try{
            const result = await deleteCourse(id)
            const message = !result ? "Product not found" : undefined
            res.send({ success: result, message })
        }catch (err) {
            return res.send({ success: false })
        }
    }
)
export default router