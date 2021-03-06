var async = require('async');

module.exports = function(app, passport) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

    var games = require('../app/controllers/games');
    app.get('/games/map', games.map);
    app.get('/games', games.index);
    app.get('/app/games', games.getAllGames);
    app.get('/app/games/:gameId', games.getGameById);
    app.post('/app/games', games.createGame);
    app.put('/app/games/:gameId', games.updateGame);
    app.del('/app/games/:gameId', games.deleteGame);
    app.param('gameId', games.game);

};
var auth = function (req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};