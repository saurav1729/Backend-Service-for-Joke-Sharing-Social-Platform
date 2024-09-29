const mongoose = require('mongoose');

const UpvoteSchema = mongoose.Schema({
    joke: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jokes",
        required: true, 
    },
    user: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Upvotes", UpvoteSchema);
