let bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

module.exports = function (app, client) {
    const db  = client.db('commentdb');
    const collection = db.collection('comment');

    app.get('/api/comment', function (req, res) {
        if(req.query.textSearch) {
            console.log(req.query.textSearch);
        }
        console.log(`GET url comment = ${req.originalUrl}`);
        console.log(`req.query = ${req.query}`);
        collection.find().toArray(function (err, results) {
            res.json(results);
        });
    });

    app.post('/api/comment', jsonParser, function (req, res) {
        console.log(`POST url = ${req.originalUrl}`);
        console.log(` author = ${req.body.author}`);
        let data = {
            author: req.body.author,
            text: req.body.text,
            data: req.body.data
        };

        collection.insertOne(data, function (err, result) {
            if(err) return console.log(err);
            res.json(result);
        })
    });

};
