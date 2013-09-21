/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('underscore');


/**
 * Game Schema
 */
var GameSchema = new Schema({
    name: String,
    type: String,
    location: String,
    dateCreated: Date,
    facebook: {},
    twitter: {},
    google: {}
});

mongoose.model('Game', GameSchema);