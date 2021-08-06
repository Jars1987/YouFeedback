const passport       = require('passport');
const express        = require('express');
const router         = express.Router();
 
 
  router.get(
    '/auth/google',
     passport.authenticate('google', {
       scope: ['profile', 'email']
      })
  );

  router.get(
    '/auth/facebook',
    passport.authenticate('facebook')
  );
 
  router.get(
    '/auth/google/callback',
    passport.authenticate('google')
  );
  router.get('/auth/facebook/callback',
   passport.authenticate('facebook')
   );

   router.get('/api/logout', (req, res) => {
     req.logout();
     res.send('You are logged Out');
   })

  router.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
 
  module.exports = router;