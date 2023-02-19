const express = require("express");
const userRouter = express.Router();
const { Usermodel } = require("../models/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "somthing went wrong", error: err.message });
      } else {
        const user = new Usermodel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "new user successfully registered" });
      }
    });
  } catch (err) {
    res.send({ msg: "somthing went wrong", error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Usermodel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          var token = jwt.sign({ userID:user[0]._id},"mynotes");
          res.send({ msg: "user login successfully", token: token });
        } else {
          res.send({ msg: "somthing went wrong", error: err });
        }
      });
    } else {
      res.send({ msg: "wrong credentials" });
    }
  } catch (err) {
    res.send({ msg: "somthing went wrong", error: err });
  }
});

module.exports = {
  userRouter,
};
