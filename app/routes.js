module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('../app/views/index.ejs')
	});
}
