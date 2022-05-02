const User = require("../model/user");

exports.validateEmail = (email) => {
  return String(email).match(
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})([\.a-z]{2,12})?$/
  );
};

exports.validateLength = (text, min, max) => {
  if (text.length > min && text.length < max) {
    return true;
  } else {
    return false;
  }
};

exports.validateUsername = async (username) => {
  console.log(username);
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
};
