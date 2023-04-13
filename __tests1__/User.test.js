const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { User } = require('../models');

describe('User model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  describe('checkPassword method', () => {
    it('returns true when password matches', async () => {
      const user = await User.create({
        username: 'testuser1',
        password: 'password123',
      });
      const result = user.checkPassword('password123');
      expect(result).toBe(true);
    });

    it('returns false when password does not match', async () => {
      const user = await User.create({
        username: 'testuser2',
        password: 'password123',
      });
      const result = user.checkPassword('wrongpassword');
      expect(result).toBe(false);
    });
  });

  describe('beforeCreate hook', () => {
    it('hashes password before creating a new user', async () => {
      const user = await User.create({
        username: 'testuser3',
        password: 'password123',
      });
      const result = await bcrypt.compare('password123', user.password);
      expect(result).toBe(true);
    });
  });

  describe('beforeUpdate hook', () => {
    it('hashes password before updating a user', async () => {
      const user = await User.create({
        username: 'testuser4',
        password: 'password123',
      });
      user.password = 'newpassword123';
      await user.save();
      const result = await bcrypt.compare('newpassword123', user.password);
      expect(result).toBe(true);
    });
  });

  describe('validation', () => {
    it('requires a username', async () => {
      const user = await User.build({
        password: 'password123',
      });
      await expect(user.save()).rejects.toThrow();
    });

    it('requires a password', async () => {
      const user = await User.build({
        username: 'testuser5',
      });
      await expect(user.save()).rejects.toThrow();
    });

    it('requires a password with length of at least 8', async () => {
      const user = await User.build({
        username: 'testuser6',
        password: 'short',
      });
      await expect(user.save()).rejects.toThrow();
    });

    it('creates a new user when all fields are valid', async () => {
      const user = await User.create({
        username: 'testuser7',
        password: 'password123',
      });
      expect(user).toMatchObject({
        username: 'testuser7',
      });
    });
  });
});
