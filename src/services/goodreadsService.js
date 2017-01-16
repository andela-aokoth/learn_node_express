var http = require('http');
var xml2json = require('xml2js');
var parser = xml2json.Parser({explicitArray: false});

var goodreadsService = function() {

    var getBookById = function(id, callback) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/656?format=xml&key=belleheaalkksjdl'
        };
        callback(null, {description: 'Our Description'});
        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;
