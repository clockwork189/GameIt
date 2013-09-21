/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Game = mongoose.model('Game');

/**
 * Show step by step search form
 */
exports.index = function(req, res) {
    res.render('games/index.html', {
        title: 'GameIt: Search Nearby Games',
        message: req.flash('error')
    });
};

