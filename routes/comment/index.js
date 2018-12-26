let _ = require('underscore');

let routes = ['crud', 'order', 'search'];

module.exports = function (app, client) {
	const db  = client.db('commentdb');
	const collection = db.collection('comment');
	_(routes).each(function (name) {
		require('./' + name)(app, collection)
	});
	return app;
};
