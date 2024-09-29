const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = async()=>{
    mongoose.connect(process.env.DbUrl).then(console.log("database connnected successfully")).catch((err)=>{console.log(err)
        process.exit(1);
    })
}


module.exports = {dbConnect};