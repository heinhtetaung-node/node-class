import express, { Request, Response } from "express";
const router = express.Router();
import Admin, { AdminTypeInput, AdminTypeOutput } from '../Models/Admin.model'
import {check, validationResult, Result, ValidationError}  from 'express-validator'
import bcryptjs from 'bcryptjs'
import { createAdmin, getAdminByEmail } from "../Repositories/AdminRepo"

// import checkJwtMiddleware from '../Middlewares/checkJwtMiddleware'
import jwt from 'jsonwebtoken'

interface AdminAll {
    success : boolean
    datas : AdminTypeOutput[] | null
}
router.get('/admin/select' , async (req : Request,res : Response<AdminAll>) => {
    const adminDatas = await Admin.findAll();
    const adminDatasNoPw = adminDatas.map((adm : any) => {
        const admData = adm.dataValues
        delete admData.password
        console.log(admData)
        return admData
    })
    console.log(adminDatasNoPw)
    res.send({
        success : true,
        datas : adminDatasNoPw
    })
})

interface AdminCreate {
    success : boolean
    datas ?: AdminTypeOutput
    validateError ?: Result<ValidationError>
}
router.post('/admin/add', 
    check('name').notEmpty().withMessage('userName is required'),
    check('email').not().isEmpty().withMessage("email is required").bail().isEmail().withMessage("email not valid").custom(value => {
        return getAdminByEmail(value).then(emailExist => {
            if (emailExist !== null) return Promise.reject('Email is already in exist.')
        })
    }),   
    check('password').notEmpty().withMessage('password is required'),
    async (req : Request<AdminTypeInput>, res : Response<AdminCreate>) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) return res.status(400).json({ success : false, validateError: errors  })

        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password
        
        try{
            bcryptjs.genSalt(10, (err : unknown, salt : string) => {
                bcryptjs.hash(password, salt, async(err : unknown, hash : string) => {
                    const passwordHash = hash
                    const createdAdmin = await createAdmin({name, email, password: passwordHash}) as any
                    const createdAdminJson = createdAdmin.dataValues
                    delete createdAdminJson.password
                    res.send({ success : true, datas : createdAdminJson })
                })
            })
        }catch (error: unknown) {
            console.log(error)
            return res.send({ success: false })
        }
    }
)

// router.post('/admin/login',
//     check('email').notEmpty().withMessage('email is required'),  // duplicate
//     check('password').notEmpty().withMessage('password is required'),
//     async (req, res) =>{
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        
//         const { password, email } = req.body;  
        
//         const admin = await Admin.findOne({
//             where : { email },
//         })

//         if (!admin) {
//             return res.send({
//                 result : false,
//                 message: "Your email is not exist!"
//             })
//         }
//         try {
//             bcrypt.compare(password, admin.password, async (err, result) => {
//                 if ( result === true ) {
//                     const adminData = admin.dataValues
//                     delete adminData.password
                    
//                     const token = jwt.sign(adminData, 'secret');                
//                     return res.send({
//                         result : true,
//                         token,
//                         user : adminData
//                     })
//                 }
//                 return res.send({
//                     result : false,
//                     message: "Password is not correct"
//                 })
//             });
//         } catch (err) {
//             res.status(500).send({
//                 result : false,
//                 message : 'Unknown error'
//             })
//         }            

//     }
// )

export default router