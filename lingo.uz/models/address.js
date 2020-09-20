const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    trim: true,
    required: false,
  },
  city: {
    type: String,
    trim: true,
    required: false,
  },
  // lonlat: {
  //   type: {
  //     type: String,
  //     default: 'Point',
  //   },
  //   cor: [Number],
  // },
  region: {
    type: String,
    trim: true,
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
});

// addressSchema.index({ lonlat: '2dsphere' });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
