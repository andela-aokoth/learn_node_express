var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(nav) {
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

    bookRouter.route('/')
              .get(function(req, res) {
                  var url = 'mongodb://localhost:27017/libraryApp';
                  mongodb.connect(url, function(url, db) {
                    var collection = db.collection('books');
                    collection.find({}).toArray(function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            res.render('bookListView', {
                                title: 'Hello From Render!',
                                nav: nav,
                                books: results
                            });
                        }
                    });
                  });

              });

    bookRouter.route('/:id')
              .get(function(req, res) {
                  var id = new objectId(req.params.id);
                  var url = 'mongodb://localhost:27017/libraryApp';
                  mongodb.connect(url, function(url, db) {
                      var collection = db.collection('books');
                      collection.findOne({_id: id}, function(err, results) {
                          if (err) {
                              console.log(err.message);
                          } else {
                              res.render('bookView', {
                                  title: 'Hello From Render!',
                                  nav: nav,
                                  books: results
                              });
                          }
                      });
                  });
              });

    return bookRouter;
};

module.exports = router;
