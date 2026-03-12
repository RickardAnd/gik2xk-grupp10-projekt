var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    next();
});

 
app.use("/product", require("./routes/productRoute"));

module.exports = app;
