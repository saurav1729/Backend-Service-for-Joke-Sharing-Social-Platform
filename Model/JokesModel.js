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
        maxlength: 200 // Changed to maxlength
    },
    author: {
        type: String,
        required: true,
        maxlength: 50, // Changed to maxlength
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upvotes",
    }],
    downvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Downvote",
    }],
    comments: [{ // Changed from Comment to comments
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Changed to Date.now for the default value
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Changed to Date.now for the default value
    }
});

module.exports = mongoose.model("Jokes", JokesSchema);
