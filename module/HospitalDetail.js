const mongoose = require('mongoose')

const hospitalDetailSchema = mongoose.Schema({
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
        required: true
    },
    log: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model("Hospitals", hospitalDetailSchema);
