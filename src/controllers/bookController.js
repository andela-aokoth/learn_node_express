var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var middleware = function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    var getIndex = function(req, res) {
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

    };

    var getById = function(req, res) {
        var id = new ObjectId(req.params.id);
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
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;
