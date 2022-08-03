const { User } = require("../models");

module.exports = {
  // Get all courses
  getUsers(req, res) {
    return User.find()
      .populate("thoughts")
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },

  getLoginUser(req, res) {
    User.findOne({ username: req.params.username })
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that username" });
        } else {
          const correctPw = user.isCorrectPassword(req.params.password);

          if (!correctPw) {
            res.status(404).json({ message: "Mismatch password" });
          }
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
