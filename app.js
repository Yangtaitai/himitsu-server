var express = require('express');
var routes = require('./routes.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('./config');
var bodyParser = require('body-parser');
var cors = require('cors');

var himitusPassport = require('./plugins/passport.js');

var app = express();

//set all Post data into req.body
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://topsecret.today");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: config.session_secret,
    store: new MongoStore({
        url: config.db
    }),
    resave: true,
    saveUninitialized: true,
}));

app.use(cors({origin:true,
    credentials:true}));

//set logged user information into req.user
himitusPassport(app);

routes(app);

var server = app.listen(4000, function() {
  console.log('Express server listening on port ' + server.address().port);
});