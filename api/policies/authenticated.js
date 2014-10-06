module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.session.redirect_to = req.originalUrl;
        return res.redirect('/login');
        //return res.send(403, {message: 'Not Authorized'});
    }
};
