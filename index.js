const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./services/passport');

const googleAuthRoutes = require('./routes/authRoutes')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

//tell express to use cookies and sessions
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 7,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleAuthRoutes);

app.get('/', (req, res) => {
  res.send('Welcome!')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`The app is listening at Port ${PORT}`);
});