const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    joke: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jokes",  // Reference to the Jokes model
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 100 
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true  
});

module.exports = mongoose.model("Comments", CommentSchema);
