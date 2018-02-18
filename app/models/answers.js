/**
 * @author Sávio Muniz
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answersSchema = Schema({
    user: {
        type: String,
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref : "Quizes",
        required: true
    },
    date : {
        type : Date,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref : "Groups",
        required: true
    },
    score : {
        type: Number,
        required :  true
    }
}, {collection : 'answers'});

answersSchema.statics.getGroupAnswers = function (groupId) {
    return this.aggregate([{$group: {_id : {group : "$group", user : "$user"}, total_score : {$sum : "$score"}}}, {$match : {'_id.group' : groupId}}]);
};


module.exports = mongoose.model("Answers", answersSchema);