const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

//==> User SignUp Router
//==> {http://localhost:5000/user/signup} {✔}
router.post("/signup", async (req, res) => {
  try {
    //==> Taking data from the request body;
    const data = req.body;
    const savedUser = new User(data);
    //==> Creating a new user one at a time;
    const response = await savedUser.save();
    //==> Payload sharing in the Token;
    const payload = {
      id: response.id,
    };
    //==> token Generator
    const token = generateToken(payload);
    //==> show the user details and Providing the token;
    res.status(201).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Issue in SignUp" });
  }
});
//==> User Login Router
//==> {http://localhost:5000/user/login} {✔}
router.post("/login", async (req, res) => {
  try {
    //==> Taking data from the request body;
    const { adharCardNumber, password } = req.body;
    //==> Finding the user by adharCardNumber
    const user = await User.findOne({ adharCardNumber: adharCardNumber });
    //==>  Checking the password
    const pass = await user.comparePassword(user.password);
    //==>  what if user or password is not to be found
    if (!user) {
      return res.status(404).send({ msg: "Username not found" });
    }
    //==>  Payload sharing in the Token;
    const payload = {
      id: user.id,
    };
    //==>  token Generator
    const token = generateToken(payload);
    //==>   show the token;
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in logging in" });
  }
});

//==> user can view personal info of him
//==> {http://localhost:5000/user/profile} {✔}
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    //==>  getting the userdata
    const userData = req.user;
    //==> finding the user and by ID and storing it in a variable called user
    const user = await User.findById(userData.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Somethign went wrong" });
  }
});

//==>  user can update thier password
//==> {http://localhost:5000/user/profile/password} {✘}
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    //==> getting the userdata from the token
    const userId = req.user;
    //==> getting the userdata from the body
    const { currentPassword, newPassword } = req.body;

    //==> Check if the user exist
    const user = await User.findById(userId);
    const pass = await user.comparePassword(currentPassword);
    //==> check if the current password is correct
    if (!pass) {
      res.status(404).send({ msg: "issue in Matching the password" });
    }
    //==>  update the password
    user.password = newPassword;
    //==>  save the user udpated data
    await user.save();
    res.status(201).send({ msg: "Password Updated SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Somethign went wrong" });
  }
});

module.exports = router;
