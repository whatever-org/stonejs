// set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port = Number(process.env.PORT || 3000)
require('./app/routes')(app);

// configuration
//mongoose.connect('mongodb://localhost/test');
//
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

// listen (start app with node server.js)
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
