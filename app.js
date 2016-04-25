var express = require('express');
var routes = require('./routes.js');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

routes(app);

var server = app.listen(4000, function() {
  console.log('Express server listening on port ' + server.address().port);
});