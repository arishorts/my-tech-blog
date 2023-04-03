const router = require('express').Router();
const { BlogPost } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const userData = await BlogPost.findOne({
      where: { id: req.params.id },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
