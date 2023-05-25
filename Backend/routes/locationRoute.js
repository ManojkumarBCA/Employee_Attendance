// locationRoutes.js

const express = require("express");
const router = express.Router();

const {
  createLocation,
  getAllLocations,
} = require("../controllers/locationController");

// Create a new location
router.route("/locations/register-location").post(createLocation);
// Get all locations
router.route("/locations/all-locations").get(getAllLocations);

module.exports = router;
