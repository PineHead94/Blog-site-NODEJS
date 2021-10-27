const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./authentication')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cookieParser())

// place mongoDB atlas URI here
// const dbURI = ''
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000)
        console.log('connected to db')
    })
    .catch((err) => console.log(err))
app.get('*', checkUser)
app.use('/',blogRoutes)

app.use((req,res)=>{
    res.status(404).render('404')
})