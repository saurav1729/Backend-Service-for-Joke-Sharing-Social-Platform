const express = require('express');
const app = express(); 
require('dotenv').config();
app.use(express.json());

const { dbConnect } = require('./config/db');
const { JokesRoutes } = require('./routes/Jokes');
const { updateRoutes } = require('./routes/update');

dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.json("Server is running on 8080");
});

// Use the jokes routes
app.use('/api/v1/jokes', JokesRoutes);
app.use('/api/v1/update',updateRoutes)

