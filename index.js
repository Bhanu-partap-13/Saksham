const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./User');
const cors = require('cors');
const connectDb = require('./database');
require('./auth');

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(cors(
  {
    origin: '*', // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  }
));

// db connection  
connectDb();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/checkLoggedIn', (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
      // User is logged in
      res.json({ loggedIn: true });
  } else {
      // User is not logged in
      res.json({ loggedIn: false });
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/signup.html'));
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));


app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  // res.send(Hello ${req.user.displayName});
  res.sendFile(path.join(__dirname,'/views/index.html'));
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
}) 

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
});

app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/callback.html'));
});

app.get('/survey', (req, res) => {
  res.sendFile(path.join(__dirname,'views/survey.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname,'views/quiz.html'));
});

app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname,'views/callback.html'));
});

app.get('/Mentor', (req, res) => {
  res.sendFile(path.join(__dirname,'views/Mentor.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname,'views/assets/img/about.jpg'));
});

app.get('/lmfinance', (req, res) => {
  res.sendFile(path.join(__dirname,'views/lmfinance.html'));
});

app.get('/lmprogram', (req, res) => {
  res.sendFile(path.join(__dirname,'views/lmprogram.html'));
});

app.get('/vedicmath', (req, res) => {
  res.sendFile(path.join(__dirname,'views/vedicmath.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname,'views/payment.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname,'views/contacts.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname,'views/team.html'));
});

app.get('/background', (req, res) => {
  res.sendFile(path.join(__dirname,'views/assets/img/background.jpg'));
});

app.get('/Aboutus', (req, res) => {
  res.sendFile(path.join(__dirname,'views/Aboutus.html'));
});


const staticDir = path.join(__dirname, 'views', 'assets');
const staticDirill = path.join(__dirname, 'views', 'assets', 'img', 'illustrations');

// Serve static files from the "img" directory
app.use('/assets', express.static(staticDir));
app.use('/images/illustrations', express.static(staticDir));


app.listen(5000, () => console.log('listening on port: 5000'));