const mongoose = require('mongoose')
// const { isEmail } = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Enter an e-mail'],
        unique: true,
        lowercase: true,
        minlength: [3, 'Name is too short']
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: [ 6,'Password has to be atleast six chars long']
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt() 
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(username,password){
    const user = await this.findOne({ username })
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect name')
}


const User = mongoose.model('user', userSchema)
module.exports = User
