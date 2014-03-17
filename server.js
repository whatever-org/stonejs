// set up
var express  = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	port = Number(process.env.PORT || 3000),
	configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('Connected to db on mongodb://localhost/stonejs');
});

app.configure(function() {
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	app.use(express.session({ secret: 'thisisaverylongandcomplicatedpassphrase!' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	// app.use(flash()); // use connect-flash for flash messages stored in session

});

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, function() {
	console.log('Listening on http://127.0.0.1:%d', server.address().port);
});
