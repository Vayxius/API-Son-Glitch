//Import Libraries
const express = require('express');
const cors = require('cors'); //Allow any request from client [GET,POST,PUT,PATCH,DELETE,OPTIONS]
const bodyParser = require('body-parser'); //Node.js body parsing middleware.
const mongoose = require('mongoose');
const multer = require('multer'); //Middleware for handling multipart/form-data, which is primarily used for uploading files.
const path = require('path');

//Import Routes From folder src/routes
const homeRoutes = require('./src/routes/home');
// const authRoutes = require('./src/routes/auth');
// const blogRoutes = require('./src/routes/blog');

//CREATE Variables
const app = express();
const port = process.env.PORT || 5000;

//Function for upload images
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

//Function to receive the document format sent by the client
const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//Call Libraries
app.use(cors()); //Call Cors
//Default or Manuall CORS
    // app.use((req,res,next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //     next();
    // })
app.use(bodyParser.json()); //Call body-parser type JSON
app.use('/images', express.static(path.join(__dirname, 'images'))); //Access for folder images
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

//ROUTES
app.use('/', homeRoutes);
// app.use('/v1/auth', authRoutes);
// app.use('/v1/blog', blogRoutes);

//ERROR HANDLER
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});

// DEFAULT RESPONSE FROM SERVER
// app.get("/",(req, res, next) => {
//     res
//     .status(200)
//     .send("Hello There...")
//     .end;
// });

//START THE SERVER & CONNECT TO MONGODB
// mongoose.connect('mongodb+srv://vayxius:kAFMj6UXg937TDZH@cluster0.nqzse.mongodb.net/blog?retryWrites=true&w=majority')
// .then(() => {
//     app.listen(port, () => {
//         console.log(`Server started on port ${port}`)
//         console.log('Press Ctrl+C to quit.');
//     });
// })
// .catch(err=>console.log(err));
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    console.log('Press Ctrl+C to quit.');
});