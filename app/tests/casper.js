var APP_URL = 'http://127.0.0.1:3000';

casper.test.begin('Our app has some pages', 2, function suite(test) {
	casper.start(APP_URL, function() {
		test.assertTitle('StoneJs', 'stonejs homepage title is the one expected');
		test.assertExists('a.navbar-brand[href="/"]', 'Navbar home link is present');
	});

	casper.run(function() {
		test.done();
	});
});
