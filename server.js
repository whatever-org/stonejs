// set up
var express  = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	engine = require('ejs-locals'),
	flash = require('connect-flash')
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

});

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, function() {
	console.log('Listening on http://127.0.0.1:%d', port);
});
