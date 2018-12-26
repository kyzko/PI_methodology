var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    config = require('config'),
    mongoClient = require('mongodb').MongoClient,
    path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


mongoClient.connect(config.url, function (err, client) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log('listen port 3000');
    });
    app.use('/', function (req, res) {
        res.render('/views/layout');
    });
    require(__dirname + '/routes/index')(app, client);

});
module.exports = app;
