const express = require("express");
const router = express.Router();
const Address = require("../models/address");

router.get("/", async (req, res) => {
  const addresses = await Address.find({});
  res.send(addresses);
});

module.exports = router;
