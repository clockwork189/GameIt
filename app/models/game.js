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
    start_time: String,
    end_time: String,
    type: [String],
    creator_id: Schema.Types.ObjectId,
    description: String,
    num_players: Number,
    level: String,
    sport: String,
    location: String,
    date: Date,
    date_created: Date,
    date_updated: Date
});

mongoose.model('Game', GameSchema);