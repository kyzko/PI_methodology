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


mongoClient.connect(config.url, function (err, client) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log('listen port 3000');
    });
    require(__dirname + '/routes/index')(app, client);

});
module.exports = app;
