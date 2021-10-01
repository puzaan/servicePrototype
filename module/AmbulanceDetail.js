const mongoose = require("mongoose");

const ambulanceDetailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    photo: {
      type: String,
      
    },
    lat: {
      type: Number,
      required: true,
    },
    log: {
      type: Number,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    maxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Ambulance = mongoose.model("Ambulances", ambulanceDetailSchema);
module.exports = Ambulance;
