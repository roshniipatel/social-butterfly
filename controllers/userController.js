const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')

      if (!user) {
        return res.status(404).json({ message: 'no user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { username: req.body.username },
      );
      res.status(200).json("user has been successfully updated!")
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async deleteUser(req, res) {
    try {
      await User.findOneAndDelete(
        { _id: req.params.userId }
      )
      res.status(200).json("user has been successfully deleted!")
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );
      
      res.status(200).json("your friend has been successfully added!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { userId: req.params.userId } } },
        { runValidators: true, new: true }
      );

      res.status(200).json("your friend has been successfully removed!");
    } catch (err) {
      res.status(500).json(err)
    }
  }
};