const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment");

const venues = require("./data/venues");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Game = require("./models/game");
const Venue = require("./models/venue");


mongoose.connect(
    "mongodb+srv://ujjawal:ujjawal@cluster0.wciqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("Error Connecting to MongoDB", error);
})

// app.listen(port, () => {
//     console.log("Server running on Port 8000");
// });
app.listen(port, '0.0.0.0', () => {
    console.log("Server running on Port 8000");
});


app.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({ userId: newUser._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        console.log("Error creating user", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Invalid email'});
        }        
        if (user.password !== password) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({userId: user._id}, secretKey);

        res.status(200).json({token});
    } catch (error) {
        console.log("Error loggin In",  error);
        res.status(500).json({message: 'Error loggin In'});
    }
})

async function addVenues() {
    for (const venueData of venues) {   // Check if the venue already exists
      const existingVenue = await Venue.findOne({name: venueData?.name});  
      if (existingVenue) {
        console.log(`Venue "${venueData.name}" already exists. Skipping.`);
      } else { // Add the new venue
        const newVenue = new Venue(venueData);
        await newVenue.save();
        console.log(`Venue "${venueData.name}" added successfully.`);
      }
    }
}

addVenues().catch(err => {
    console.error('Error adding venues:', err);
});

app.get('/venues', async (req, res) => {
    try {
      const venues = await Venue.find({});
    //   console.log("ven",venues)
      res.status(200).json(venues);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Failed to fetch venues'});
    }
});