const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.user_id).select('-password');
  res.send({ result: true, user: user._id});
});



module.exports = router;
