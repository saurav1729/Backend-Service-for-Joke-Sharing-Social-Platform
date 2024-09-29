const mongoose = require('mongoose');


const downVoteSchema= mongoose.Schema({
    joke: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jokes",
        required: true, 
    },
    user: {
        type: String,
        required: true,
    }
})

module.exports=mongoose.model('Downvote',downVoteSchema);