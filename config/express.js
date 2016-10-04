var express = require('express');
module.exports = function() {
    var app = express();
    var route = require('../app/routers/login.routes');
    var path = require ('path');
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    // parse various different custom JSON types as JSON 
    app.use(bodyParser.json({ type: 'application/*+json' }));
     
    // parse some custom thing into a Buffer 
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
     
    // parse an HTML body into a string 
    app.use(bodyParser.text({ type: 'text/html' }));
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.use(route);
    app.use(express.static('./public'));
    return app;
};