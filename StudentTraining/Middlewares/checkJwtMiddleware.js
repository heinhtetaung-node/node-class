const jwt = require('jsonwebtoken')

const checkJwtMiddleware = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader); // "Beareer 122424"        
    if (!bearerHeader) {
        return res.status(401).send({
            result : false,
            message : "No Authentication!"
        })
    }
    const bearerHeaderArr = bearerHeader.split(' ');
    // console.log(bearerHeaderArr)
    const token = bearerHeaderArr[1];
    // console.log(token)

    jwt.verify(token, 'secret', (err, decoded) => {
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

module.exports = checkJwtMiddleware