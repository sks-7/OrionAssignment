const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    postInput: { type: 'string', require: true },

    picture: {
      type: 'String',
      default:
        'https://kddi-h.assetsadobe3.com/is/image/content/dam/au-com/mobile/mb_img_58.jpg?scl=1',
    },
  },
  { timestaps: true }
);

const Post = model('post', PostSchema);
module.exports = Post;
