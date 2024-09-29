const Jokes = require('../Model/JokesModel');
const Upvotes = require('../Model/upvoteModel');
const Comments = require('../Model/CommentModel');

exports.addJoke = async (req, res) => {
    console.log(req.body); // Consider removing in production
    try {
        const { content, title, author } = req.body;
        const newJoke = new Jokes({ title, content, author });
        const savedJoke = await newJoke.save(); 
        res.status(201).json({
            success: true, 
            data: savedJoke,
            message: "New Joke added successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ // Changed to 500 for Internal Server Error
            success: false, 
            data: "Internal Server Error",
            message: err.message
        });
    }
};

exports.getAllJokes = async (req, res) => {
    try {
        const AllJokes = await Jokes.find()
            .populate("upvotes") // Changed to lowercase
            .populate("comments") // Changed to lowercase
            .exec();

        res.status(200).json({
            success: true,
            data: AllJokes,
            message: "All Jokes fetched successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ // Changed to 500 for Internal Server Error
            success: false, 
            data: "Internal Server Error",
            message: err.message
        });
    }
};
