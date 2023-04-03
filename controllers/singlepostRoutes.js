const router = require('express').Router();
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Comment = require('../models/Comment');

router.get('/:post_id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.post_id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    const blogpost = blogPostData.get({ plain: true });

    const loggedIn = req.session.loggedIn;
    const user_id = req.session.user_id;

    //res.json(blogpost);
    res.render('singlepostpage', { blogpost, loggedIn, user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:post_id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      description: req.body.description,
      user_id: req.session.user_id,
      blogpost_id: req.params.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
