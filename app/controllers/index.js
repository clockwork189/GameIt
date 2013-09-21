/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');


exports.render = function(req, res) {
	var user = req.user || undefined;
	console.log("user: ", req.user);
    res.render('index.html', { user: user, title: 'GameIt: Home'} );
};