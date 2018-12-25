let bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

module.exports = function (app, client) {
    const db  = client.db('commentdb');
    const collection = db.collection('comment');

    app.get("/api/comment", jsonParser, function (req, res) {
        let textSearch = req.query.textSearch;
        console.log(`url = ${req.originalUrl}`);
        console.log(` Search = ${textSearch}`);
        if (textSearch === '') {
            collection.find().toArray(function (err, results) {
                res.json(results)
            })
        }
        else {
            collection.createIndex({"text": "text"});
            collection.find({$text: {$search: textSearch}}).toArray(function (err, results) {
                console.log(results);
                res.json(results);
            });
        }
    })
};
