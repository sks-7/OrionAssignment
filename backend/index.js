const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('./config/Connection');

const userController = require('./Controllers/User');
const postControl = require('./Controllers/Post');

const port = process.env.PORT || 5001;
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome my server');
});

app.use('/user', userController);

app.use('/post', postControl);

app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
    console.log('Not connected');
  }
  console.log(`Listning at PORT ${port}`);
});
