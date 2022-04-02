import jwt from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from "express";

export interface RequestWithAuth<T> extends Request {
    authuser?: any
}

const checkJwtMiddleware = async (req : RequestWithAuth<any>, res : Response, next : NextFunction) => {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
        return res.status(401).send({
            result : false,
            message : "No Authentication!"
        })
    }
    // bearer 12121212
    const bearerHeaderArr = bearerHeader.split(' ');
    const token = bearerHeaderArr[1];
    // console.log(token)

    jwt.verify(token, 'secret', (err : unknown, decoded : any) => {
        if (err) {
            return res.status(401).send({
                result : false,
                message : "Wrong token"
            })  
        }
        req.authuser = decoded
        next()            
    })
}

export { checkJwtMiddleware }
