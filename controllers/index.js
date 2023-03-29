const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
