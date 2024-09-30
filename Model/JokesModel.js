const mongoose = require('mongoose');

const JokesSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        maxlength: 50, 
    },
    content: {
        type: String,
        required: true,
        maxlength: 200
    },
    author: {
        type: String,
        required: true,
        maxlength: 50, 
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upvotes",
    }],
    downvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Downvote",
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    }],
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Jokes", JokesSchema);
