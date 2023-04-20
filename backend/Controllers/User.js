const { Router } = require('express');
const userController = Router();
const User = require('../Models/auth.model');
const jwt = require('jsonwebtoken');

userController.get('/', async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

userController.post('/signup', async (req, res) => {
  const { name, email, pic, shortBio, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.send('User alredy exists');
    } else {
      const userdata = await User.create({
        name,
        email,
        pic,
        shortBio,
        password,
      });
      res.send({ status: true, message: 'User created succefully', userdata });
    }
  } catch (e) {
    console.log(e.message);
  }
});

userController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      // const name = user.name;

      const token = jwt.sign(
        { id: user._id, email: user.email },
        'SECRET1234',
        { expiresIn: '8 hours' }
      );
      res.send({ status: true, message: 'login success', token });
    }
  } catch (err) {
    console.log(err.message);
  }
});

userController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const singleUser = await User.findOne({ _id: id });
  res.send(singleUser);
});

userController.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send({ status: true, message: 'Update success', updateUser });
  } catch (e) {
    console.log(err.message);
  }
});

module.exports = userController;
