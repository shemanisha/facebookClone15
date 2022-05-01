const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
    text: true,
  },
  user_name: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  picture: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    trim: true,
  },
  bYear: {
    type: Number,
    required: [true, "birth year is required"],
    trim: true,
  },
  bMonth: {
    type: Number,
    required: [true, "birth month is required"],
    trim: true,
  },
  bDay: {
    type: Number,
    required: [true, "birth day is required"],
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
  details: {
    bio: {
      type: String,
    },
    othername: {
      type: String,
    },
    job: {
      type: String,
    },
    workplace: {
      type: String,
    },
    highschool: {
      type: String,
    },
    college: {
      type: String,
    },
    currenCity: {
      type: String,
    },
    homeTown: {
      type: String,
    },
    relationship: {
      type: String,
      enum: [
        "Single",
        "In relationship",
        "Engaged",
        "Married",
        "Its Complicated",
      ],
    },
    instagram: {
      type: String,
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        saveAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
