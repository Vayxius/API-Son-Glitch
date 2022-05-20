//Import Libraries
const express = require('express');
const {body} = require('express-validator');

//CREATE Variables
const router = express.Router();
const newsController = require('../controllers/news');

// CREATE -> POST : http://localhost:5000/v1/news/post
router.post('/post', [
    body('title').isLength({ min: 5 }).withMessage('input title tidak sesuai'), 
    body('body').isLength({ min: 5 }).withMessage('input body tidak sesuai')], 
    newsController.createNewsPost);

// READ ALL -> GET : http://localhost:5000/v1/news/posts
router.get('/posts', newsController.getAllNewsPost);

// READ BY ID -> GET : http://localhost:5000/v1/news/post/{id}
router.get('/post/:postId', newsController.getNewsPostById);

// UPDATE BY ID -> PUT : http://localhost:5000/v1/news/post/{id}
router.put('/post/:postId', [
    body('title').isLength({ min: 5 }).withMessage('input title tidak sesuai'), 
    body('body').isLength({ min: 5 }).withMessage('input body tidak sesuai')], 
    newsController.updateNewsPost);

// DELETE BY ID -> DELETE : http://localhost:5000/v1/news/post/{id}
router.delete('/post/:postId', newsController.deleteNewsPost);

module.exports = router;