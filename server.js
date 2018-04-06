// LIBRARIES
const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')

// CONSTANTS
const PORT = process.env.PORT || 8085

// EXEC
const app = express()

// LOGGER
if(process.env.NODE_ENV != 'TEST') app.use(morgan('tiny'));

app.disable('x-powered-by');

// METHODS SETUP
app.use(bodyParser.urlencoded({ extended: false, limit:1024*1024*1.5 }))
app.use(bodyParser.json({ limit:1024*1024*1.5 }))

// REMOVE EXPRESS TAG FROM HEADERS
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    next();
});

// ROUTES
app.use('/', require('./routes'));

// HANDLE NOT FOUND 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// HANDLE ALL KINDS OF ERROR (422, 401, 500, ...)  
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {}
    }});
});  

// STARTUP
app.listen(PORT,() => {
    if(process.env.NODE_ENV != 'TEST') console.log('Running on localhost:'+PORT)
})

module.exports = app