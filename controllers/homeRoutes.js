const router = require('express').Router();
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({ include: User });
    if (!blogPostData) {
      res.status(404).json({ message: 'no data found' });
    }

    const blogposts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    const loggedIn = req.session.loggedIn;
    const user_id = req.session.user_id;

    res.render('homepage', { blogposts, loggedIn, user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
