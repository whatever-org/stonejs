var app = require('http').createServer(requestHandler),
	port = Number(process.env.PORT || 3000),
	static = require('node-static'),
	util = require("util"),
	fileServer = new static.Server('./public', { cache: false })
	assetTypes = [".js", ".css", ".txt", ".ico", ".html", ".png"];

function isStaticResource(url) {
	return assetTypes.reduce(function(memo, assetType) {
		return memo || url.indexOf(assetType) !== -1;
	}, false);
}


function requestHandler(request, response) {
	request.addListener('end', function () {
		if (!isStaticResource(request.url)) {
			request.url = "/";
		}
		fileServer.serve(request, response);
	}).resume();
}

app.listen(port, function() {
	console.log("Listening on http://127.0.0.1:" + port);
});
