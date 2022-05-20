const {validationResult} = require('express-validator');
const NewsPost = require('../models/news');
const path = require('path');
const fs = require('fs');

exports.createNewsPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path.replace(/\\/g, "/");
    const body = req.body.body;

    const Posting = new NewsPost({
        title: title,
        image: image,
        body: body,
        author: {uid:1,name: 'Vayxius'}
    });

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create News Success',
            data: result
        });
    })
    .catch(err => {
        console.log('err: ', err);
    });
}

exports.getAllNewsPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    NewsPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return NewsPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data News Berhasil Dipanggil',
            data: result,
            total_Data: totalItems,
            per_Page: parseInt(perPage),
            current_Page: parseInt(currentPage)
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.getNewsPostById = (req, res, next) => {
    const postId = req.params.postId;
    NewsPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Data News Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'News Berhasil Dipanggil',
            data: result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.updateNewsPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path.replace(/\\/g, "/");
    const body = req.body.body;
    const postId = req.params.postId;

    NewsPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Data News Tidak Ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.image = image;
        post.body = body;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Success',
            data: result
        });
    })
    .catch(err => {
        next(err);
    });
}

exports.deleteNewsPost = (req, res, next) => {
    const postId = req.params.postId;

    NewsPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Data News Tidak Ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        removeImage(post.image);
        return NewsPost.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({
            messagee: 'Hapus News Berhasil',
            data: result
        });
    })
    .catch(err => {
        next(err);
    });
}

const removeImage = (filePath) => {
    console.log('filePath',filePath);
    console.log('dir name: ', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}