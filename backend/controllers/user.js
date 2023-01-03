const User = require("../model/user");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    //return to stop code

    //To check if email id already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email Id already exists,try with different email address",
      });
    }

    //validate the length of firstname, lastname and password
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First Name length must be between 3 and 30",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last Name length must be between 3 and 30",
      });
    }

    if (!validateLength(password, 4, 40)) {
      return res.status(400).json({
        message: "Password length must be between 3 and 30",
      });
    }

    //bcrypt password

    let encryptedPassword = await bcrypt.hash(password, 12);

    //username
    let tempusername = first_name + last_name;
    let newusername = await validateUsername(tempusername);

    const user = await new User({
      first_name,
      last_name,
      email,
      username: newusername,
      password: encryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.status(200).send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.lastname,
      token: token,
      verified: user.verified,
      message: "Register success ! Please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
