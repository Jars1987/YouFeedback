const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./services/passport');

const googleAuthRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

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

app.use(express.json());

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
app.use('/', billingRoutes);

if(process.env.NODE_ENV === 'production'){
  //express will serve up production assets
  app.use(express.static('client/biuld'))

  //express will serve up index.html file if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`The app is listening at Port ${PORT}`);
});