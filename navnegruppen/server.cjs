const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./User.cjs');
const Ticket = require('./Ticket.cjs');
const { BoyName, GirlName, InternationalBoyName, InternationalGirlName, UnisexName } = require('./Names.cjs');

const app = express();


// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add 'http://localhost:5174' to the allowed origins
  credentials: true,
}));


app.use(
  session({
    secret: 'your-sec23423ret-key',
    resave: false,
    saveUninitialized: false,
    // Add any other session configuration options here
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mols:ID4EY0Cqr80zSnH2@cluster0.euyeftl.mongodb.net/NewbornNamesCloudDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Received email:', email);
      console.log('Received password:', password);
  
      const user = await User.findOne({ email });
  
      if (user) {
        if (user.password === password) {
          // Set user session data after successful login
          req.session.user = {
            id: user._id,
            email: user.email,
            firstName: user.personalInfo.firstName,
            lastName: user.personalInfo.lastName,
            username: user.username,
            // Add other user data fields here as needed
          };
  
          // Log the session user
          console.log('User Data:', req.session.user);
  
          res.status(200).json({ message: 'Login successful', user: req.session.user });
        } else {
          console.log('Password mismatch:', user.password, '!==', password);
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        console.log('User not found for email:', email);
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;
    console.log('Registration attempt:', { username, password, firstName, lastName, email });

    // Check for existing user with the same username or email
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      console.log('User already exists with email or username:', email, username);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, // Consider using hashing for the password
      personalInfo: {
        firstName,
        lastName,
      },
      email,
      likedNames: [], // Initialize with empty array
      matches: []    // Initialize with empty array
    });

    await newUser.save();
    console.log('User registered successfully:', newUser);

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to get Boy Names
app.get('/BoyNames', async (req, res) => {
  try {
    const boyNames = await BoyName.find();
    res.json(boyNames);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get Girl Names
app.get('/GirlNames', async (req, res) => {
  try {
    const girlNames = await GirlName.find();
    res.json(girlNames);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for International Boy Names
app.get('/InternationalBoyNames', async (req, res) => {
  try {
    const internationalBoyNames = await InternationalBoyName.find();
    res.json(internationalBoyNames);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for International Girl Names
app.get('/InternationalGirlNames', async (req, res) => {
  try {
    const internationalGirlNames = await InternationalGirlName.find();
    res.json(internationalGirlNames);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for Unisex Names
app.get('/UnisexNames', async (req, res) => {
  try {
    const unisexNames = await UnisexName.find();
    res.json(unisexNames);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to create a support ticket
app.post('/tickets', async (req, res) => {
  console.log("Received ticket data:", req.body);

  // Extract user data from the request body
  const { userData, message } = req.body;

  try {
    // Create a new ticket and include user data
    const newTicket = new Ticket({
      sender: userData.username, // Assuming 'username' is the user identifier
      message,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.get('/session', (req, res) => {
  if (req.session.user) {
    const userData = {
      id: req.session.user.id,
      email: req.session.user.email,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      username: req.session.user.username,
    
    };
    res.status(200).json({ loggedIn: true, user: userData });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});




app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: 'Error logging out' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
