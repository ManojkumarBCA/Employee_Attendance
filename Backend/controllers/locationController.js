// locationController.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const Location = require("../models/locationModel");

//Register User Location
exports.createLocation = async (req, res, next) => {
  try {
    const { locationName, locationCode } = req.body;
    const location = await Location.create({
      locationName,
      locationCode,
    });
    res.status(201).json({
      success: true,
      location,
    });

    // await location.save();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// exports.createLocation = async (req, res) => {
//   try {
//     const { locationName } = req.body;
//     const locationCode = generateLocationCode(locationName); // Function to generate the location code
//     function generateLocationCode() {
//       const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//       const numbers = "0123456789";
//       let code = "";

//       // Generate three random characters
//       for (let i = 0; i < 3; i++) {
//         const randomChar = characters.charAt(
//           Math.floor(Math.random() * characters.length)
//         );
//         code += randomChar;
//       }

//       // Generate three random numbers
//       for (let i = 0; i < 3; i++) {
//         const randomNumber = numbers.charAt(
//           Math.floor(Math.random() * numbers.length)
//         );
//         code += randomNumber;
//       }

//       return code;
//     }

//     const location = new Location({ locationId, locationName, locationCode });
//     await location.save();

//     res.status(201).json(location);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
