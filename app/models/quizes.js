const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizesSchema = Schema({
    title: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref : "Groups",
        required: true
    },
    questions : [{
        options: [{
            type: String,
            required: true
        }],
        correct: {
            type: Number,
            required: true
        },
        title : {
            type: String,
            required: true
        }
    }],
    active: {
        type: Boolean,
        required : true
    }
}, {collection : 'quizes'});

quizesSchema.statics.getWithAnswers = function () {
    return this.aggregate([{$lookup: {from: "answers", localField: "_id", foreignField: "quiz", as: "answers"}}]);
};


module.exports = mongoose.model("Quizes", quizesSchema);

