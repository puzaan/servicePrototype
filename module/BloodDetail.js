const mongoose = require("mongoose");

const bloodDetailSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Blood = mongoose.model("Bloods", bloodDetailSchema);
module.exports = Blood;
