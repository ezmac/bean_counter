var passport = require('passport');
module.exports = {
    login: function(req, res) {
        res.view('auth/login');
    },

    process: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if((err) || (!user)) {
                console.log('Authentication error: ');
                console.log(err);
                console.log(user);
                console.log(info);
                res.redirect('/login');
                return;
            }

            console.log(user);

            req.logIn(user, function(err) {
                if(err) {
                    console.log(err);
                    res.redirect('/login');
                    return;
                }
                console.log(req.isAuthenticated());
                res.redirect('/');
                return;
            });
        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.send('logout successful');
    },

    _config: {},
};
