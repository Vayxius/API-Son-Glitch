//Import Libraries
const express = require('express');
const path = require('path');

//CREATE Variables
const router = express.Router();

//Function show home page, send request to server for access baseurl (http://yourdomain.com/)
router.get('/*',function(req,res){
    res.sendFile(path.join(__dirname, '..', '/view/index.html'));
});

module.exports = router;