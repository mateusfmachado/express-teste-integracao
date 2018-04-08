const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8085;
const app = express();

app.use( bodyParser.urlencoded({ extended: false}) );
app.use( bodyParser.json() );

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

app.listen( PORT, () => {
    return process.env.NODE_ENV != 'TEST' && 
            console.log('Running on localhost:'+PORT);
});

module.exports = app;