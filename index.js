var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var MONGOLAB_URI='mongodb://emmitfitz:Emmit3900@ds117271.mlab.com:17271/realize';
// mongoose.connect('mongodb://localhost/realize');
mongoose.connect(MONGOLAB_URI);

require('./server/config/routes.js')(app, express);
require('./server/config/middleware.js')(app, express);

var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('listening on port ' + port)
})

module.exports = app;