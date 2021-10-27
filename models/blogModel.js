const mongoose = require('mongoose')

const Schema = mongoose.Schema
const blogSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: String
})

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog