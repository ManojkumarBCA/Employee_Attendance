const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationId: {
    type: Number,
    unique: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  locationCode: {
    type: String,
    required: true,
  },
});

// Generate a random 4-digit UserId
locationSchema.pre("save", function (next) {
  const randomId = Math.floor(100000 + Math.random() * 900000);
  this.locationId = randomId;
  next();
});

module.exports = mongoose.model("Location", locationSchema);
