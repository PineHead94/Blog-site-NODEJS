const Blog = require('../models/blogModel')


module.exports.home = (req,res) => {
        Blog.find().sort({ createdAt: -1})
        .then((results) => {
            res.status(200).render('index', {blogs:results})
        })
        .catch(err => res.redirect('/404'))
}

module.exports.about = (req,res) => {
    res.status(200).render('about')
}
module.exports.create = (req,res) => {
    res.status(200).render('create')
}

module.exports.singleBlog = (req,res) =>{
    const id = req.params.id
    Blog.findById(id)
        .then((result) =>{
            let file = `/uploads/`+`${result.image}`
            res.render('blog', {blog:result, file})
        })
        .catch(err => console.log(err))
}

module.exports.createBlog = (req,res) => {
    if(req.body.name&&req.body.heading&&req.body.body&&req.file.filename){
        let blog = new Blog()
        blog.name = req.body.name
        blog.heading = req.body.heading
        blog.body = req.body.body
        blog.image = req.file.filename
        blog.save()
        .then((result)=> {
            res.redirect('/')
        })
        .catch((err) => console.log(err))
    } else {
        res.render('create', {msg:'Error'})
    }
}

module.exports.deleteBlog = (req,res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/'}))
        .catch(err => console.log(err))
}

// module.exports.searchQuery = (req,res) => {
//     const query = req.body.searchQuery
//     Blog.find({ username: `/${query}/` })
//     .then((result) => {
//         res.render('index', {blogs:result})
//     })
//     .catch(err => {
//         res.render('index', {blogs:null})
//     })
// }