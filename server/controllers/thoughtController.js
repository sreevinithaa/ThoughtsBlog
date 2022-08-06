const { Thought, User } = require("../models");

module.exports = {
  // Get all courses
  getThoughts(req, res) {
    const params = req.query.username ? {thoughtAuthor:req.query.username} : {};
 
    return Thought.find(params)
      .sort({ createdAt: -1 })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
 

  getSingleThought(req, res) {
   
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
  let thought;
    Thought.create(req.body)
      .then((thought) => {
        thought=thought;
        return User.findOneAndUpdate(
          { username: thought.thoughtAuthor },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          :   res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addComment(req, res) {
   
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $addToSet: {
          comments: {
            commentText: req.body.commentText,
            commentAuthor: req.body.commentAuthor,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Error occured!No thought found!",
            })
          :  res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeComment(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.param.thoughtId },
      {
        $pull: {
          comments: {
            _id: req.param.commentId,
            commentAuthor: req.param.username,
          },
        },
      },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thought couldnt find!",
            })
          :   res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.param.thoughtId,
      thoughtAuthor: req.param.username,
    }).then((thought) =>
      !thought
        ? res.status(404).json({
            message: "thought couldnt find!",
          })
        : User.findOneAndUpdate(
            { username: thought.thoughtAuthor},
            { $pull: { thoughts: thought._id } }
          ).then((user) =>
            !user
              ? res.status(404).json({
                  message: "user couldnt find!",
                })
              : res.json(user)
          )
    );
  },
};
