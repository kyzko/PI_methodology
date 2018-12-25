let commentCrud = require('./comment/crud'),
    commentSearch = require('./comment/search');

module.exports = function (app, client) {
    commentCrud(app, client);
    commentSearch(app, client);
    return app;
};
