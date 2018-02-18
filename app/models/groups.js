/**
 * @author Sávio Muniz
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupsSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {collection : 'groups'});

module.exports = mongoose.model("Groups", groupsSchema);