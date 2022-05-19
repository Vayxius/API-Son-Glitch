//Import Libraries
const express = require('express');
const {body} = require('express-validator');

//CREATE Variables
const router = express.Router();
const blogController = require('../controllers/blog');

// CREATE -> POST : http://localhost:5000/v1/blog/post
router.post('/post', [
    body('title').isLength({ min: 5 }).withMessage('input title tidak sesuai'), 
    body('body').isLength({ min: 5 }).withMessage('input body tidak sesuai')], 
    blogController.createBlogPost);

// READ ALL -> GET : http://localhost:5000/v1/blog/posts
router.get('/posts', blogController.getAllBlogPost);

// READ BY ID -> GET : http://localhost:5000/v1/blog/post/{id}
router.get('/post/:postId', blogController.getBlogPostById);

// UPDATE BY ID -> PUT : http://localhost:5000/v1/blog/post/{id}
router.put('/post/:postId', [
    body('title').isLength({ min: 5 }).withMessage('input title tidak sesuai'), 
    body('body').isLength({ min: 5 }).withMessage('input body tidak sesuai')], 
    blogController.updateBlogPost);

// DELETE BY ID -> DELETE : http://localhost:5000/v1/blog/post/{id}
router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;