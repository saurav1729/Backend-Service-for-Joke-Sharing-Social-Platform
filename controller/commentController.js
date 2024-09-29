const Jokes = require('../Model/JokesModel');
const Comments = require('../Model/CommentModel');

exports.createComment = async (req, res) => {
    try {
        const { joke, content, user } = req.body;
        if (!joke || !user || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newComment = new Comments({ joke, content, user });
        await newComment.save();
        console.log(newComment);
        const updatedJoke = await Jokes.findByIdAndUpdate(
            joke, 
            { $push: { comments: newComment._id } },  
            { new: true }
        ).populate('comments');  
        if (!updatedJoke) {
            return res.status(404).json({ message: "Joke not found" });
        }
        console.log(updatedJoke);
        res.status(200).json({
            success: true,
            data: updatedJoke,
            message: "Comment added successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.deleteComment = async(req, res) => {
    try {
        const { joke, comment } = req.body;
        const deletedComment = await Comments.findByIdAndDelete(comment);

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        const updatedJoke = await Jokes.findByIdAndUpdate(
            joke,
            { $pull: { comments: comment } },
            { new: true }
        ).populate('comments');

        if (!updatedJoke) {
            return res.status(404).json({
                success: false,
                message: 'Joke not found'
            });
        }

        console.log(updatedJoke);

        res.status(200).json({
            success: true,
            data: updatedJoke,
            message: `Comment with ID: ${comment} is deleted`
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};
