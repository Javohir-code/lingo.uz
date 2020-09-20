const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  first_name: {
    type: String,
    trim: true,
    required: false,
  },
  last_name: {
    type: String,
    trim: true,
    required: false,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: false,
    validate(value) {
      if (value < 0) {
        throw new Error("invalid number");
      }
    },
  },
  isMale: {
    type: Boolean,
    default: false,
  },
  phone_number: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  registered_date: {
    type: Date,
    default: Date.now,
  },
});

// Generate Token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      user_id: this._id,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
