var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var app = express();
var print = console.log;

var port = process.env.PORT || 5000;
var nav = [
    {
        Link: '/Books', Text: 'Book'
    },
    {
        Link: '/Authors', Text: 'Author'
    }
];

// Connecting To a MS SQL Server w/ mssql
var sql = require('mssql');
// Create a configuration object
/*
var config = {
    user: null,
    password: null,
    server: null,
    database: null,
    options: {
        encrypt: true
    }
};
var connection = new sql.Connection(config, function(err) {
    if (err) {
        print(err.message);
    }
});
*/
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// Setup folders that contain static files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

// Using Handlebars
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs');

// Using Jade
// app.set('view engine', 'jade');

// Using EJS
app.set('view engine', 'ejs');

// Creating Simple Routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello From Render!',
        nav: [
            {
                Link: '/Books', Text: 'Books'
            },
            {
                Link: '/Authors', Text: 'Authors'
            }
        ]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello, Books!');
});

app.listen(port, function(err) {
    print('Running Server On Port: ' + port);
});
