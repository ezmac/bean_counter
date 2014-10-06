/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = {

  login: function (req, res) {
    res.view();
  },

  dashboard: function (req, res) {
    res.view();
  },

  logout: function (req, res){
    req.session.user = null;
    req.session.flash = 'You have logged out';
    res.redirect('user/login');
  },
  passport_test: function(req, res){

    console.log("Passport_test function reached");
    passport.use(new LdapStrategy({
      server: {
        url: 'LDAP://hostname',
        adminDn: 'username',
        adminPassword: 'password',
        searchBase: 'DC=mycompany,DC=org',
        searchFilter: '(sAMAccountName={{username}})',
        searchAttributes: [
        'dn',
        'sAMAccountName',
        'mail',
        'memberOf',
        'givenName',
        'sn'
      ]
      }},
      function(user, done) {
        return done(null, user);
      }
      ));

  },
  passport_local: function(req, res)
  {
    passport.use(new LocalStrategy(
          {usernameField: 'email'},
          function(username, password, done) {
            User.findOne({ email: username}, function (err, user) {
              debugger;
              console.log("I think this means trying login");
              if (err) { console.log(err);return done(err); }
              if (!user) { return done(null, false); }
              if (user) { return done(null, user); }
              // look at me breaking everything.
              //if (!user.verifyPassword(password)) { return done(null, false); }
              return done(null, user);
            });
          }
          ));
      passport.authenticate('local', function(err, user, info) {
        console.log("in authenticate function");
        console.log(user);

        if ((err) || (!user)) {
          res.redirect('/user/login');
          return;
        }

        req.logIn(user, function(err) {
          if (err) {
            res.redirect('/user/login');
            return;
          }
          console.log("I think this means good log in");

          res.redirect('/');
          return;
        });
      })(req, res);
  },

  logout: function (req,res) {
    req.logout();
    res.redirect('/');
  },
  _config: {}

};

