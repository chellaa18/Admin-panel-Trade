var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../db_details/config');
var dbname = config.dbPrefix + 'TEMPLATE_MODEL';

var templateSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    subject: {
        type: String,
        default: ""
    },
    template: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 1
    },
    language: {
        type: Number,
        default: 1
    },
    for_language: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('emailTemplate', templateSchema, dbname);