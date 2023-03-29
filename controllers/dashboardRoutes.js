const router = require('express').Router();
const { BlogPost, User } = require('../models');

router.get('/:user_id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      where: { user_id: req.params.user_id },
      include: User,
    });
    const blogposts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    const loggedIn = req.session.loggedIn;
    const user_id = req.session.user_id;

    res.status(200).render('dashboard', { blogposts, loggedIn, user_id });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
