const express = require('express');
const Post = require('../Models/post.model');

const postControl = express.Router();

postControl.get('/', async (req, res) => {
  try {
    const psotList = await Post.find();
    return res.status(200).send(psotList);
  } catch (err) {
    return res.status(500).send('Internal Server error');
  }
});

postControl.post('/new', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res
      .status(200)
      .send({ message: 'Post added successfully', newPost });
  } catch (err) {
    return res.status(500).send('Internal Server error');
  }
});

postControl.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .send({ message: 'post updated successfully', updatePost });
  } catch (err) {
    return res.status(500).send('Internal Server error');
  }
});

postControl.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: 'post deleted successfully' });
  } catch (err) {
    return res.status(500).send('Internal Server error');
  }
});

module.exports = postControl;
