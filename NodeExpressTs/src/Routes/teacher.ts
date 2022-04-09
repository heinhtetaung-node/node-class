import express, { Request, Response } from "express"
const router = express.Router()
import { TeacherTypeInput, TeacherTypeOutput } from '../Models/Teacher.model'
import { check, ValidationError, validationResult, Result } from "express-validator"
import { allTeacher, createTeacher, updateTeacher, deleteTeacher, getCoursesByTeacher, GetCoursesByTeacher } from "../Repositories/TeacherRepo"

// http://localhost:3000/teacher
interface Teachers {
    success: boolean,
    datas: TeacherTypeOutput[] | null
} 

router.get('/teacher', async(req: Request, res: Response<Teachers>) => {
        try {
            const result = await allTeacher()
            res.send({ success: true, datas: result })
        } catch (error: unknown) {
            res.status(500).send({ success : false, datas : null  })
        }
    }
)

// http://localhost:3000/teacher/add
interface TeacherCreate {
    success : boolean
    datas ?: TeacherTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/teacher/add', 
    check('teacherfees').notEmpty().withMessage('teacherfees is required').isInt().withMessage('teacherfees must be numeric'),
    check('name').notEmpty().withMessage('name is required'),
    check('qualitification').notEmpty().withMessage('qualitification is required'),
    async (req : Request<TeacherTypeInput>, res : Response<TeacherCreate>) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ success : false, validateError: errors  })

        const teacherfees: number = req.body.teacherfees
        const name: string = req.body.name
        const qualitification: string = req.body.qualitification

        try {
            const result = await createTeacher({ teacherfees, name, qualitification })
            res.send({ success: true, datas: result })
        } catch (error) {
            return res.send({ success: false })
        }
    }
)

// http://localhost:3000/teacher/edit/:id
interface EditTeacher extends TeacherCreate {
    message ?: string
}

router.patch('/teacher/edit/:id', async(req: Request, res: Response<EditTeacher>) => {
    const id: number = parseInt(req.params.id)
    const teacherfees: number = req.body.teacherfees
    const name: string = req.body.name
    const qualitification: string = req.body.qualitification

    try {
        const result = await updateTeacher({ id, teacherfees, name, qualitification })
        if (!result) {
            return res.send({ success: false, message: 'Product not found!' })
        }
        res.send({ success: true, datas: result })
    } catch (error) {
        return res.send({ success: false })
    }
})


// http://localhost:3000/teacher/delete/:id
interface DeleteTeacher extends TeacherCreate {
    message ?: string
}

router.delete('/teacher/delete/:id', 
    async(req: Request, res: Response<DeleteTeacher>) => {
        const id: number = parseInt(req.params.id)
        try{
            const result = await deleteTeacher(id)
            const message = !result ? "Product not found" : undefined
            res.send({ success: result, message })
        }catch (err) {
            return res.send({ success: false })
        }
    }
)


router.get('/teachers/courses/:id', async (req : Request, res : Response<GetCoursesByTeacher>) => {
    const id : number = parseInt(req.params.id)
    getCoursesByTeacher(id).then((result : any) => {
        res.send(result)
    })
})

export default router