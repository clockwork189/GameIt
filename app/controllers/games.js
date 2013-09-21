/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Game = mongoose.model('Game'),
    _ = require('underscore');

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
