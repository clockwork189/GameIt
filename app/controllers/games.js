/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Game = mongoose.model('Game'),
    _ = require('underscore');



/**
 * Find game by id
 */
exports.game = function(req, res, next, id) {
    Game.findOne({
            _id: id
        })
        .exec(function(err, game) {
            if (err) return next(err);
            if (!game) return next(new Error('Failed to load game ' + id));
            req.profile = game;
            next();
        });
};
/**
 * Show step by step search form
 */
exports.index = function(req, res) {
    res.render('games/index.html', {
        title: 'GameIt: Search Nearby Games',
        message: req.flash('error')
    });
};


exports.getGameById = function (req, res) {
	res.jsonp(req.game);
};

exports.createGame = function (req, res) {
	var game = new Game(req.body);
    game.creator_id = req.user._id;
    game.save();
    res.jsonp(game);
};

exports.updateGame = function (req, res) {
	var game = req.game;
    game = _.extend(game, req.body);
    game.save(function(err) {
        res.jsonp(game);
    });
};

exports.getAllGames = function(req, res) {
    Game.find().sort('-dateCreated').populate('user').exec(function(err, games) {
        if (err) {
            res.render('error.html', {
                status: 500
            });
        } else {
            res.jsonp(games);
        }
    });
};

exports.deleteGame = function (req, res) {
	var game = req.game;
    game.remove(function(err) {
        if (err) {
            res.render('error.html', {
                status: 500
            });
        } else {
            res.jsonp(game);
        }
    });
};

exports.map = function(req, res) {
    res.render("games/gameIt.html");

}
