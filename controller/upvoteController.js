const Upvotes = require('../Model/upvoteModel');
const Jokes = require ('../Model/JokesModel');
const Downvote  = require('../Model/downVoteModel')



exports.upvoteJoke = async(req,res)=>{
  
    try{
        const {joke, user}=req.body; 
        if(!joke || !user){
            return res.status(401).json("All fileds are  required");
        }
        const upvote = new Upvotes({
            joke,user
        }) ; 
        await upvote.save();
        console.log(upvote);
        const updatedJoke = await Jokes.findByIdAndUpdate(joke,{$push:{upvotes:upvote._id}}, {new:true})
        if (!updatedJoke) {
            return res.status(404).json({ message: "Joke not found" });
          }
        console.log(updatedJoke);

        res.status(200).json(
            {
                success:true, 
                data:updatedJoke, 
                message:"Joke is upvoted succesfully"
            }
        )
    }catch(err){
        console.log(err); 
        
        res.status(501).json(
            {
                success:false, 
                data:"Internal server Error", 
                message:err.message
            }
        )
    }
}

exports.downVoteJoke = async (req, res) => {
    try {
        const { joke, user } = req.body; 
        if (!joke || !user) {
            return res.status(400).json({ message: "All fields are required" }); 
        }
        const existingUpvote = await Upvotes.findOne({ joke, user });
        
        if (existingUpvote) {
            await Upvotes.findByIdAndDelete(existingUpvote._id);
            await Jokes.findByIdAndUpdate(joke, { $pull: { upvotes: existingUpvote._id } });
        }
        const downvote = new Downvote({ joke, user }); 
        await downvote.save();
        await Jokes.findByIdAndUpdate(joke, { $push: { downvotes: downvote._id } }); 
        const updatedJoke = await Jokes.findById(joke).populate('upvotes').populate('downvotes'); 

        res.status(200).json({
            success: true, 
            data: updatedJoke, 
            message: "Joke is downvoted successfully"
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json({
            success: false, 
            data: "Internal Server Error", 
            message: err.message
        });
    }
};
