var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../db_details/config');
var dbname = config.dbPrefix + 'USER_MODEL';

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema, dbname);