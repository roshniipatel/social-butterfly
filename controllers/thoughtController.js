const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'no thought with that ID has been found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async createThoughts(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404).json({ message: 'no thought with that ID has been found' });
      }

      res.json('thought has been successfully created!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
      );
      res.status(200).json("thought has been successfully updated!")
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async deleteThought(req, res) {
    try {
      await Thought.findOneAndRemove(
        { _id: req.params.thoughtId }
      )
      res.status(200).json("thought has been successfully deleted!")
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async addReaction(req, res) {
    console.log(req.body);
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      res.status(200).json("your reaction has been successfully added!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      res.status(200).json("your reaction has been successfully removed!");
    } catch (err) {
      res.status(500).json(err)
    }
  },
}