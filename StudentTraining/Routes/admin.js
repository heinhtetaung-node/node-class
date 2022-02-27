const express = require('express')
const router = express.Router()
const Admin = require('../Models/Admin.model.js')
const {check, validationResult}  =require('express-validator')
const bcrypt = require('bcryptjs')
const checkJwtMiddleware = require('../Middlewares/checkJwtMiddleware')
const jwt = require('jsonwebtoken')

router.get('/admin/select' , checkJwtMiddleware , async (req,res) => {
    const datas = await Admin.findAll();
    res.send(datas)
})

router.post('/admin/login',
    check('email').notEmpty().withMessage('email is required'),  // duplicate
    check('password').notEmpty().withMessage('password is required'),
    async (req, res) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        
        const { password, email } = req.body;  
        
        const admin = await Admin.findOne({
            where : { email },
        })

        if (!admin) {
            return res.send({
                result : false,
                message: "Your email is not exist!"
            })
        }
        try {
            bcrypt.compare(password, admin.password, async (err, result) => {
                if ( result === true ) {
                    const adminData = admin.dataValues
                    delete adminData.password
                    
                    const token = jwt.sign(adminData, 'secret');                
                    return res.send({
                        result : true,
                        token,
                        user : adminData
                    })
                }
                return res.send({
                    result : false,
                    message: "Password is not correct"
                })
            });
        } catch (err) {
            res.status(500).send({
                result : false,
                message : 'Unknown error'
            })
        }            

    }
)

router.post('/admin/add',
    checkJwtMiddleware,
    check('userName').notEmpty().withMessage('userName is required'),
    check('email').notEmpty().withMessage('email is required'),  // duplicate
    check('password').notEmpty().withMessage('password is required'),        
    async (req, res) =>{
        // console.log('req.authuser', req.authuser);

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        const {userName, password, email} = req.body;  
        
        try{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const hashPassword = hash
                    await Admin.create({
                        userName,
                        password : hashPassword,
                        email
                    })
                    res.send({
                        result : true
                    })
                });
            });        
        } catch(err) {
            console.log(err)
            res.send({
                result : false
            })
        }        
    }
)
router.patch('/admin/update/:id' , checkJwtMiddleware , async (req, res) => {
    const id = req.params.id;
    const {userName, password, email} = req.body;
    const user = await Admin.findByPk(id)
    if (user.length == 0) {
        return res.send({
            result : false,
            message : 'user not found'
        })
    }
    try{
        await Admin.update({
            userName,
            email,
            password
        }, {
            where : {
                id
            }
        })
    } catch (err) {
        console.log(err);
        return res.send({
            result : false
        })
    }
    res.send({
        result : true
    })
})
router.delete('/admin/delete/:id', checkJwtMiddleware , async (req, res) =>{
    const id = req.params.id;
    const user = await Admin.findByPk(id)
    if (user.length == 0) {
        res.send({
            result : false,
            message : 'No user is found'
        })
    }
    try{
        await Admin.destroy({
            where: {
                id
            }
        })
    } catch (err) {
        console.log(err);
        res.send({
            result : false
        })
    }
    res.send({
        result : true
    })
})
module.exports = router