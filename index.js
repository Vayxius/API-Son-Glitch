const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

//GET RESPONSE FROM SERVER
app.get("/",(req, res, next) => {
    res
    .status(200)
    .send("Hello There...")
    .end;
});

//START THE SERVER
app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
});