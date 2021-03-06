/**
 * 
function insertBlog(
	title, 
	body, 
	slug, 
	author, 
	comments, 
	category
	){
	db.blogs.insert(
		{title:title, 
			body:body, 
			slug:slug, 
			author: ObjectId(author), 
			comments:comments, 
			category:category
		});
}


insertBlog(
    "Building Websites",
    "Hugo is a general-purpose website framework. Websites built with Hugo are extremely fast",
    "The-world's-fastest-framework-for-building-websites",
    "5bb26043708926e438db6cad",
    [
        {
            user_id:ObjectId("5bb26043708926e438db6cae"),
            comment: "There are lots of free themes to built a website.",
            approved: true,
            created_at: ISODate("2020-10-02"),
        },
        {
            user_id:ObjectId("5bb26043708926e438db6caf"),
            comment: "I created github webpage using a Hugo theme.",
            approved: true,
            created_at: ISODate("2020-02-02"),
        },
        ],
    [
        {name: "Websites"},
        {name: "Free Themes"}
        ]
)


 */
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
//var Date = mongoose.Schema.Types.Date;
var Mixed = mongoose.Schema.Types.Mixed;



//User Model
var User = require('./user');

const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		default: true
	}
});

const commentsSchema = mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Blogs Schema
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    author: userSchema,
    comments: [commentsSchema],
    category: [categorySchema]
})

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get All Blogs - find method
module.exports.getBlogs = (callback, limit) => {
    Blog.find(callback).exec(limit); 
}


// Get Blog - findById method
module.exports.getBlogById = (id, callback) => {
    Blog.findById(id).exec(callback);
}

// Add Blog - create method
module.exports.addBlog = (blog, callback) => {
	Blog.create(blog, callback);
};

// Update Blog - findOneAndUpdate method
module.exports.updateBlog = (id, newBlog, options, callback) => {
	query = Blog.findById(id)
	Blog.findOneAndUpdate(query, newBlog, options, callback);
};


// Delete Blog - deleteOne method
module.exports.removeBlog = (blog, callback) => {
	Blog.deleteOne(Blog.findById(blog), callback);
};
