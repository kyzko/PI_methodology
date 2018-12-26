let _ = require('underscore');

let routes = ['comment'];

module.exports = function (app, client) {
    _(routes).each(function (name) {
        require('./' + name)(app, client)
    });
    return app;
};
