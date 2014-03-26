// set up
var express  = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	engine = require('ejs-locals'),
	flash = require('connect-flash'),
	fs = require('fs'),
	configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('Connected to db on mongodb://localhost/stonejs');
});

require('./config/passport')(passport);

app.configure(function() {
	app.engine('ejs', engine);

	app.use(express.static(__dirname + '/public'));

	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.json());
	app.use(express.urlencoded());

	app.use(express.logger({
	  format: ':status :remote-addr :method :url :response-time' }
	));
	app.set('views', __dirname+ '/app/views')
	app.set('view engine', 'ejs'); // set up ejs for templating

	app.use(express.session({ secret: 'thisisaverylongandcomplicatedpassphrase!' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(function(req, res, next) {
		res.locals.user = req.user;
		res.locals.isAuthenticated = req.isAuthenticated();
		next();
	});

});

var models_path = __dirname + '/app/models';
var walk = function(path) {
	fs.readdirSync(path).forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		if (stat.isFile()) {
			if (/(.*)\.(js$|coffee$)/.test(file)) {
				require(newPath);
			}
		} else if (stat.isDirectory()) {
			walk(newPath);
		}
	});
};
walk(models_path);

// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
	fs.readdirSync(path).forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		if (stat.isFile()) {
			if (/(.*)\.(js$|coffee$)/.test(file)) {
				require(newPath)(app, passport);
			}
		// We skip the app/routes/middlewares directory as it is meant to be
		// used and shared by routes as further middlewares and is not a
		// route by itself
		} else if (stat.isDirectory() && file !== 'middlewares') {
			walk(newPath);
		}
	});
};
walk(routes_path);

app.listen(port, function() {
	console.log('Listening on http://127.0.0.1:%d', port);
});
