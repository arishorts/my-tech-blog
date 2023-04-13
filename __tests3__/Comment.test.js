const Comment = require('../models/Comment');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

describe('Comment model', () => {
  beforeAll(async () => {
    await User.sync();
    await BlogPost.sync();
    await Comment.sync();
  });

  afterEach(async () => {
    await Comment.drop();
    await BlogPost.drop();
    await User.drop();
  });

  describe('Validations', () => {
    it('should not create a new comment with missing required fields', async () => {
      const user = await User.create({
        username: 'testuser0',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription0',
        user_id: user.id,
        title: 'testtitle0',
      });

      // Missing required field: content
      await expect(
        Comment.create({
          user_id: user.id,
          blogpost_id: blogpost.id,
        })
      ).rejects.toThrow();
    });

    it('should create a new comment with valid fields', async () => {
      const user1 = await User.create({
        username: 'testuser1',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription1',
        user_id: user1.id,
        title: 'testtitle1',
      });
      const comment = await Comment.create({
        description: 'testcomment1',
        user_id: user1.id,
        blogpost_id: blogpost.id,
      });
      expect(comment).toBeInstanceOf(Comment);
    });

    it('should delete a comment successfully', async () => {
      const user1 = await User.create({
        username: 'testuser2',
        password: 'password123',
      });
      const blogpost = await BlogPost.create({
        description: 'testdescription2',
        user_id: user1.id,
        title: 'testtitle2',
      });
      const comment = await Comment.create({
        description: 'testcomment2',
        user_id: user1.id,
        blogpost_id: blogpost.id,
      });
      await comment.destroy();
      const foundComment = await Comment.findOne({ where: { id: comment.id } });
      expect(foundComment).toBeNull();
    });

    it('should not create a new comment with invalid foreign key references', async () => {
      await expect(
        Comment.create({
          description: 'testcomment3',
          user_id: 1,
          blogpost_id: 1,
        })
      ).rejects.toThrow();
    });
  });
});
