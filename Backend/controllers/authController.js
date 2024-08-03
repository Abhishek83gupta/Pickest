const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateAccessToken } = require("../Helpers/accessToken");
const { generateRefreshToken } = require("../Helpers/refreshToken");

// Signup user
const signup = async (req, res) => {
  const { username, email, password, accountType } = req.body;

  try {
    // User is already exist or not
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already in use" });
    }

    // Creating user
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    // user = new User({
    //   username,
    //   email,
    //   password: securePassword,
    //   accountType,
    // });

    // await user.save(); // Here complusory

    const newUser = await User.create({username, email, password:securePassword, accountType})
    // await newUser.save()    // Here not complusory
    return res
      .status(201)
      .json({ success: true, message: "User created succesfully" });


  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //user is available
    let user = await User.findOne({ email });             // change user here then change all the user
    if (!user) {
      return res.status(400).json({ success: true, message: "please Signup" });
    }

    //if user available
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const data = {
        id: user._id,
        accountType : user.accountType,
        author : user.username,
    }

    const accessToken = generateAccessToken(data)
    const refreshToken = generateRefreshToken(data)
 
    return res.status(200).json({
        success:true,
        message:"Login successful",
        accessToken,
        refreshToken,
        role:user.accountType,
        author:user.username
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
  signup,
};
