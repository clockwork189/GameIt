/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Game Schema
 */
var GameSchema = new Schema({
    players: [String],
    field_data_id: String,
    start_time: Date,
    end_time: Date,
    type: String,
    description: String,
    num_players: Number,
    level: String,
    sport: String,
    Location: String
});

mongoose.model('Game', GameSchema);