const jwt = require('jsonwebtoken')
const User = require('./models/userModel')

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'secret code', (err,decodedToken)=> {
            if(err){
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,'secret code',(err,decodedToken)=> {
            if(err){
                res.locals.user = null
                next()
            } else {
                User.findById(decodedToken.id)
                .then((user) => {
                    res.locals.user = user
                    next()
                })
                .catch(err => {
                    res.locals.user = null
                    next()
                })
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth,checkUser }