const express = require('express')
const Blog = require('../models/blogModel')
const upload = require('../upload')
const blogController = require('../controllers/blogController')
const userController = require('../controllers/userController')
const { requireAuth } = require('../authentication')

const router = express.Router()

router.get('/', blogController.home)
router.get('/about', blogController.about)
router.get('/create',requireAuth ,blogController.create)
router.post('/create', upload, blogController.createBlog)
// router.post('/create', upload, (req,res)=>{
//     // console.log(req.body)

//     // create method

//     // const data = req.body
//     // Blog.create( data ,(err,result)=>{
//     //     if(err){
//     //         console.log(err)
//     //     } else {
//     //         console.log('Data saved to DB')
//     //         res.redirect('/')
//     //     }
//     // })

//     // save() method
    
//     if(req.body.name&&req.body.heading&&req.body.body&&req.file.filename){
//         let blog = new Blog()
//         blog.name = req.body.name
//         blog.heading = req.body.heading
//         blog.body = req.body.body
//         blog.image = req.file.filename
//         blog.save()
//         .then((result)=> {
//             res.redirect('/')
//         })
//         .catch((err) => console.log(err))
//     } else {
//         res.render('create', {msg:'Error'})
//     }
    
//     // upload(req,res, (err) => {
//     //     if (err){
//     //         res.render('create',{msg:err})
//     //     } else {
//     //         if (req.file == undefined){
//     //             res.render('create', {msg:'No file selected'})
//     //         } else {
//     //             let blog = new Blog()
//     //             blog.name = req.body.name
//     //             blog.heading = req.body.heading
//     //             blog.body = req.body.body
//     //             blog.image = req.file.filename
//     //             blog.save()
//     //             .then((result)=> {
//     //                 res.redirect('/')
//     //             })
//     //             .catch((err) => console.log(err))
//     //         }
//     //     }
//     // })
// })

router.get('/blogs/:id',requireAuth,blogController.singleBlog)
router.delete('/blogs/:id', blogController.deleteBlog)
router.get('/signup', userController.signup_get )
router.post('/signup', userController.signup_post )
router.get('/login', userController.login_get )
router.post('/login', userController.login_post )
router.get('/logout', userController.logout_get)


module.exports = router
