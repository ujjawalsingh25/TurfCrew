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
        console.log(`Venue "${venueData.name}" already exists.`);
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

app.post('/creategame', async (req, res) => {
  try {
    const {sport, area, date, time, admin, totalPlayers} = req.body;

    const activityAccess = 'public';

    console.log('sport', sport);
    console.log(area);
    console.log(date);
    console.log(admin);

    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      players: [admin],
    });

    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to create game'});
  }
});

app.get('/games', async (req, res) => {
    try {
      const games = await Game.find({})
        .populate('admin')
        .populate('players', 'image firstName lastName');
  
      const currentDate = moment();
  
      
        const filteredGames = games.filter(game => {         // Filter games based on current date and time
          const gameDate = moment(game.date, 'Do MMMM');      // Assuming your date is stored in "9th July" format
          console.log('game Date', gameDate);
          const gameTime = game.time.split(' - ')[0];          // Get the start time of the game
          console.log('game time', gameTime);

          const gameDateTime = moment(
              `${gameDate.format('YYYY-MM-DD')} ${gameTime}`,
              'YYYY-MM-DD h:mm A',
          );
          console.log('gamedateTime', gameDateTime);
    
          return gameDateTime.isAfter(currentDate);
      });
  
      const formattedGames = filteredGames.map(game => ({
        _id: game._id,
        sport: game.sport,
        date: game.date,
        time: game.time,
        area: game.area,
        players: game.players.map(player => ({
          _id: player._id,
          imageUrl: player.image,                                // Player's image URL
          name: `${player.firstName} ${player.lastName}`,       // Optional: Player's name
        })),
        totalPlayers: game.totalPlayers,
        queries: game.queries,
        requests: game.requests,
        isBooked: game.isBooked,
        adminName: `${game.admin.firstName} ${game.admin.lastName}`,
        adminUrl: game.admin.image,                         // Assuming the URL is stored in the image field
        matchFull: game.matchFull
      }));
      res.json(formattedGames);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Failed to fetch games'});
    }
});

app.get('/upcoming', async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming you have user authentication and req.user contains the authenticated user's info
    console.log('userId', userId);

    const games = await Game.find({     // Fetch games where the user is either the admin or a player
      $or: [
        {admin: userId},         // Check if the user is the admin
        {players: userId},      // Check if the user is in the players list
      ],
    }).populate('admin')
      .populate('players', 'image firstName lastName');

    const formattedGames = games.map(game => ({   // Format games with the necessary details
      _id: game._id,
      sport: game.sport,
      date: game.date,
      time: game.time,
      area: game.area,
      players: game.players.map(player => ({
        _id: player._id,
        imageUrl: player.image,                                  // Player's image URL
        name: `${player.firstName} ${player.lastName}`,         // Optional: Player's name
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      courtNumber: game.courtNumber,
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image,                           // Assuming the URL is stored in the image field
      isUserAdmin: game.admin._id.toString() === userId,
      matchFull:game.matchFull
    }));

    res.json(formattedGames);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to fetch upcoming games'});
  }
});

app.post('/games/:gameId/request', async (req, res) => {
  try {
    const {userId, comment} = req.body;           // Assuming the userId and comment are sent in the request body
    const {gameId} = req.params;

    const game = await Game.findById(gameId);         // Find the game by ID
    if (!game) {
      return res.status(404).json({message: 'Game not found'});
    }

    const existingRequest = game.requests.find(       // Check if the user has already requested to join
      request => request.userId.toString() === userId,
    );
    if (existingRequest) {
      return res.status(400).json({message: 'Request already sent'});
    }
    
    game.requests.push({userId, comment});        // Add the user's ID and comment to the requests array
    await game.save();            // Save the updated game document
    res.status(200).json({message: 'Request sent successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to send request'});
  }
});

app.get('/games/:gameId/requests', async (req, res) => {
  try {
    const {gameId} = req.params;
    const game = await Game.findById(gameId).populate({
      path: 'requests.userId',
      select: 'email firstName lastName image skill noOfGames playpals sports',   // Select the fields you want to include
    });

    if (!game) {
      return res.status(404).json({message: 'Game not found'});
    }

    const requestsWithUserInfo = game.requests.map(request => ({
      userId: request.userId._id,
      email: request.userId.email,
      firstName: request.userId.firstName,
      lastName: request.userId.lastName,
      image: request.userId.image,
      skill: request.userId.skill,
      noOfGames: request.userId.noOfGames,
      playpals: request.userId.playpals,
      sports: request.userId.sports,
      comment: request.comment,
    }));

    res.json(requestsWithUserInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to fetch requests'});
  }
});

app.get('/user/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({message: 'User not found'});
    }

    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: 'Error fetching the user details'});
  }
});