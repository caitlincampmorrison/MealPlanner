const express = require('express');
const path = require('path')
const morgan = require('morgan')

const app = express()

app.use(require('method-override')('_method')); // needed for DELETE method

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());

//static file-serving middleware
app.use(express.static(path.join(__dirname, '..','public')));

//AJAX routes 
app.use('/api',  require('./api'))

//send single-page index.html
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

/*
//Error catching endware
app.use(function (err, req, res, next) {
    console.log(err);
    res
      .status(err.status || 500)
      .sendFile(path.join(__dirname, "../public/404page.html"));
});
  
//Catches any routes that don't exist
app.get("*", function (req, res) {
    res.status(404).sendFile(path.join(__dirname, "../public/404page.html"));
});

*/

module.exports = app;
