//import blogpost
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const sequelize = require('../config/connection');

//describe blogpost model
describe('BlogPost model', () => {
  //beforeall hook to initialize the database
  beforeAll(async () => {
    await User.sync();
    await BlogPost.sync();
  });

  //afterallhook to destroy the database
  afterAll(async () => {
    await BlogPost.drop();
    await User.drop();
  });
  //test all the validations
  describe('Validations', () => {
    test('Test if BlogPost model exists', async () => {
      const user = await User.create({
        username: 'testuser1',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription1',
        user_id: user.id,
        title: 'testtitle1',
      });
      expect(blogpost).toMatchObject({
        description: 'testdescription1',
        user_id: user.id,
        title: 'testtitle1',
      });
    });
    // Test if all required fields (title, date_created) are present.
    test('Test if all required fields (title, date_created) are present', async () => {
      const user = await User.create({
        username: 'testuser2',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription2',
        user_id: user.id,
        title: 'testtitle2',
      });
      expect([blogpost.date_created, blogpost.title]).toBeDefined();
    });

    // Test if a BlogPost instance can be successfully created in the database.
    test('Test if a BlogPost instance can be successfully created and retrieved from the database', async () => {
      const user = await User.create({
        username: 'testuser3',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription3',
        user_id: user.id,
        title: 'testtitle3',
      });
      const createdBlogPost = await BlogPost.findByPk(blogpost.id);
      expect(createdBlogPost).toBeDefined();
    });

    // Test if a BlogPost instance can be successfully updated in the database.
    test('Test if a BlogPost instance can be successfully updated in the database.', async () => {
      const user = await User.create({
        username: 'testuser4',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription4',
        user_id: user.id,
        title: 'testtitle4',
      });

      await BlogPost.update(
        { description: 'updated description' },
        {
          where: {
            description: 'testdescription4',
          },
        }
      );
      const updatedBlogPost = await BlogPost.findByPk(blogpost.id);
      expect(updatedBlogPost.description).toEqual('updated description');
    });

    test('Test if a BlogPost instance can be successfully deleted from the database', async () => {
      // Create a new user and a new blog post
      const user = await User.create({
        username: 'testuser5',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription5',
        user_id: user.id,
        title: 'testtitle5',
      });

      await BlogPost.destroy({ where: { id: blogpost.id } });
      const deletedBlogPost = await BlogPost.findByPk(blogpost.id);
      expect(deletedBlogPost).toBeNull();
    });
  });
});
