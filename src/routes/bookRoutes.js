var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var router = function(nav) {
    // Use static list of books before integrating MongoDB
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

    var bookController = require('../controllers/bookController')(null, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
              .get(bookController.getIndex);

    bookRouter.route('/:id')
              .get(bookController.getById);

    return bookRouter;
};

module.exports = router;
