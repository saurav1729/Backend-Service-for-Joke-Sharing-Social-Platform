const express = require('express');

const router  = express.Router(); 


//controller 

const {upvoteJoke, downVoteJoke}=require('../controller/upvoteController');
const { createComment, deleteComment } = require('../controller/commentController');



//upvote routes 

router.post('/upvote',upvoteJoke);
router.post('/downVote',downVoteJoke)

router.post('/comment',createComment);
router.post('/deleteComment',deleteComment);


module.exports = {updateRoutes:router};