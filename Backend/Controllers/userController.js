const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");
const responseBuilder = require("../utils/response");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isEmailExists = await User.findOne({ email });
    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);
      const userData = await User.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      responseBuilder(res, null, userData, "Wohoo!!User registered successfully", 200);
    } else {
      responseBuilder(
        res,
        null,
        null,
        `User with email id ${email} already exists. Please try again.`,
        400
      );
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong while registering user.", 500);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let token = "";
    if (!user) {
      responseBuilder(res, null, null, `User not found!`, 400);
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        responseBuilder(res, null, null, `Invalid Credentials`, 400);
      } else {
        token = await jwt.sign({ id: user._id, role: user.role }, "LoginSecretKey", {
          expiresIn: "9h",
        });

        let userData = await user.toJSON();
        delete userData.password;
        responseBuilder(res, null, { ...userData, token }, "User logged in successfully", 200);
      }
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong while login.", 500);
  }
};
