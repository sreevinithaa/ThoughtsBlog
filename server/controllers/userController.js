const { User } = require("../models");
const { signToken } = require('../utils/auth');
module.exports = {
  // Get all courses
  getUsers(req, res) {
    return User.find()
      .populate("thoughts")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  getLoginUser(req, res) {
    
    User.findOne({ email: req.body.username })
      .select("-__v")
      .then((user) => {
        console.log(user);
        if (!user) {
          res.status(404).json({ message: "No user with that username" });
        } else {
          const correctPw = user.isCorrectPassword(req.body.password);

          if (!correctPw) {
            res.status(404).json({ message: "Mismatch password" });
          }
          
          const token = signToken(user);
 
   
          res.json({user,token});
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
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => { const token = signToken(user);     
        res.json({user,token});})
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
