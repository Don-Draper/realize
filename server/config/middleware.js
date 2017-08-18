var morgan = require('morgan');
var bodyParser = require('body-parser');
var Q = require('q');
var User = require('../users/userModel.js');
var findUser = Q.nbind(User.findOne, User);
var passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = 'indianSnakeGods';

var jwtOptions = {}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log(jwt_payload);
  findUser({_id: jwt_payload.id}).then(function(user) {
        if (user) {
          console.log(user);
            return done(null, user);
        } else {
          console.log('no idea');
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = function (app, express) {
  // app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  console.log('this is directory name in middleware: ' + __dirname);

};