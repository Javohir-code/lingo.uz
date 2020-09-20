const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const User = require("../models/user");
const Address = require("../models/address");

const bcrypt = require("bcrypt");
const _ = require("lodash");

router.get("/me", async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { error } = validateLogin(req.body);
  if (error)
    return res.send({ result: false, error: error.details[0].message });

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).send({ error: "Unauthorized" });

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) return res.status(401).send({ error: "Unauthorized" });

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send({
    result: true,
    token: { access_token: token, token_type: "bearer" },
  });
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { error } = validateRegister(req.body);
  if (error) return res.send({ result: false, error: error.details[0].message });

  console.log(req.body);
  // Checking user he/she is alread exist or not
  let user = await User.findOne({ username: req.body.username });
  if (user)
    return res
      .status(400)
      .send({ result: flase, messega: "This User is already exist!" });

  let address = new Address({
    country: req.body.country,
    city: req.body.city,
    lonlat: {
      cor: [43.95, -26.75],
    },
    region: req.body.region,
    status: req.body.status,
  });

  await address.save();

  user = new User({
    address: address._id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    age: req.body.age,
    isMale: req.body.isMale,  
    phone_number: req.body.phone_number,
    password: req.body.password,
  });

  // Hashing Password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  result = true;
  res.header("x-auth-token", token).send({
    user: user._id,
    result: result,
    token: { access_token: token, token_type: "bearer" },
  });
});

router.post("/logout", async (req, res) => {
  res.send({ result: true });
});

function validateLogin(req) {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });

  return Joi.validate(req, schema);
}

function validateRegister(req) {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).max(50).required(),
    age: Joi.number().required(),
    isMale: Joi.boolean(),
    phone_number: Joi.number().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    country: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    region: Joi.string().min(2).required(),
    status: Joi.number().required(),
  });

  return Joi.validate(req, schema);
}

module.exports = router;
