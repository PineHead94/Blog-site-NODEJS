const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const handleError = (err) => {
    const errors = { username:'',password:''  }
    if(err.message.includes('E11000')){
        errors.username = 'This user already exists'
        return errors
    }

    if( err.message.includes('user validation failed') ){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    if(err.message == 'incorrect name'){
        errors.username = err.message
    }
    if(err.message == 'incorrect password'){
        errors.password = err.message
    }
    return errors
}


const maxAge = 3 * 24 * 60 * 60
const createToken = (id,username) => {
    return jwt.sign({ id,username }, 'secret code', {
        expiresIn:maxAge
    })
}


module.exports.signup_get = (req,res) => {
    res.render('signup')
}

module.exports.signup_post = async (req,res) => {
    try{
        const user = await User.create(req.body)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly:true, maxAge:maxAge })
        res.json({ redirect: '/' })
    }
    catch(err){
        const error = handleError(err)
        res.json({ error })
    }
}

module.exports.login_get = (req,res) => {
    res.render('login')
}

module.exports.login_post = async (req,res) => {
    const { username,password } = req.body
    let token
    User.login(username,password)
        .then((result) => {
            token = createToken(result._id,result.username)
        })
        .then(() => {
            res.cookie('jwt', token, { httpOnly:true,maxAge:maxAge })
            res.json({ redirect:'/' })
        })
        .catch(err => {
            let errors = handleError(err)
            res.json({ errors })
        })
    // try{
    //     const user = await User.login(username,password)
    //     const token = createToken(user._id)
    //     res.cookie('jwt', token, { httpOnly:true,maxAge:maxAge })
    //     res.json({ redirect:'/' })
    // }
    // catch(err){
    //     const errors = handleError(err)
    //     res.json({ errors })
    // }

}
module.exports.logout_get = (req,res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}