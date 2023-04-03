const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SYNCED -----\n');

  const blogPosts = await BlogPost.bulkCreate(blogPostData);
  console.log('\n----- BLOGPOSTS SYNCED -----\n');

  const comments = await Comment.bulkCreate(commentData);
  console.log('\n----- COMMENTS SYNCED -----\n');

  // for (const blogPost of blogPostData) {
  //   await BlogPost.create({
  //     ...blogPost,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
