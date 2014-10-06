/* *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */



var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    LdapStrategy = require('passport-ldapauth').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
    /*
  console.log("in passport.js serializeUser function")
  if (user) {
    return done(null, user);
  }
 */
});

passport.deserializeUser(function(id, done) {
  console.log("in passport.js deserializeUser function");
  User.findOne({id:id}, function(err,user) {
      console.log(user);
      done(err,user);
  });
  /*
  User.findOne({ username: adUser.sAMAccountName })
  .exec(function(error, user){
    if (user) {

      user.email = adUser.mail;
      user.firstname = adUser.givenName;
      user.lastname = adUser.sn;

      user.save(function(err){
        if (err) return done(null, false);
        else {
          sails.config.user = user;
          sails.config.user.memberOf = adUser.memberOf;

          return done(null, user);
        }
      });

    } else {
      User.create({
        username: adUser.sAMAccountName,
        email: adUser.mail,
        firstname: adUser.givenName,
        lastname: adUser.sn
      }).exec(function(err, user){
        if (err) {
          return done(null, false);
        }
        else {
          sails.config.user = user;
          sails.config.user.memberOf = adUser.memberOf;

          return done(null, user);
        }
      });
    }
  });
 */
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('In LocalStrategy');
        console.log(username);
        console.log(password);
        User.findOne({username:username}, function(err, user) {
            if(err) { return done(null, err); }
            if(!user || user.length < 1) {
                return done(null, false, {message: 'Incorrect User'});
            }

            bcrypt.compare(password, user.password, function(err, res) {
                if(!res)  {
                    return done(null, false, {
                        message: 'Invalid password',
                    });
                }

                return done(null, user);
            });
        });
    })
);


module.exports = {
    http: {
        customMiddleware: function(app) {
            console.log('middleware for passport');
            app.use(passport.initialize());
            app.use(passport.session());
        }
    },
/*
  local:true,
  ldap:{
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
    }
  }
 */
};
