const { Schema, model } = require('mongoose');

const AuthSchema = new Schema(
  {
    name: { type: 'string' },
    email: { type: 'string' },
    pic: {
      type: 'String',
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    shortBio: { type: 'string' },
    password: { type: 'string' },
  },
  { timestaps: true }
);

const User = model('Auth', AuthSchema);
module.exports = User;
