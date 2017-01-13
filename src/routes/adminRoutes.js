var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikoyalevich Tolstoy',
        read: false
    },
    {
        title: 'Steve Jobs',
        genre: 'Biography',
        author: 'Walter Isaacson',
        read: true
    },
    {
        title: 'The Valkyries',
        genre: 'Fantasy Fiction',
        author: 'Paulo Coelho',
        read: false
    },
    {
        title: 'Professional C++',
        genre: 'Educational',
        author: 'Bjarne Strostrup',
        read: true
    }
];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(url, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        res.send(results);
                    }
                    db.close();
                });
            });
            // res.send('Inserting Books...');
        });
    return adminRouter;
};

module.exports = router;
