let bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

module.exports = function (app, client) {
    const db  = client.db('commentdb');
    const collection = db.collection('comment');
    app.get('/api/comment/order', jsonParser, function (req, res) {
        console.log(`length = ${req.query.length}, createDate = ${req.query.createDate}`);
        mongoClient.connect(config.url, function (err, client) {
            const db = client.db('commentdb');
            const collection = db.collection('comment');
            if(err) return console.log(err);
            if (req.query.length !== "text") {
                let length = req.query.length[0] == "-" ? -1 : 1;
                collection.aggregate([
                    {$match: {}},
                    {
                        $project: {
                            "length": {$strLenCP: "$text"},
                            "author": 1,
                            "text": 1,
                            "data": 1,
                        }
                    },
                    {$sort: {length: length}},
                ]).toArray(function (err, results) {
                    res.json(results);
                });
            }
            else
            if (req.query.createDate !== "data") {
                let createDate = req.query.createDate[0] == "-" ? -1 : 1;
                collection.aggregate([
                    {$match: {}},
                    {
                        $project: {
                            "length": {$strLenCP: "$text"},
                            "author": 1,
                            "text": 1,
                            "data": 1,
                        }
                    },
                    {$sort: {data: createDate}},
                ]).toArray(function (err, results) {
                    res.json(results);
                });
            } else {
                let createDate = req.query.createDate[0] == "-" ? -1 : 1;
                let length = req.query.length[0] == "-" ? -1 : 1;
                collection.aggregate([
                    {$match: {}},
                    {
                        $project: {
                            "length": {$strLenCP: "$text"},
                            "author": 1,
                            "text": 1,
                            "data": 1,
                        }
                    },
                    {$sort: {data: createDate, length: length}},
                ]).toArray(function (err, results) {
                    res.json(results);
                });
            }
            client.close();
        })
    });
};
