const express        = require('express');
const router         = express.Router();
const keys           = require('../config/keys');
const stripe         = require('stripe')(keys.StripeSecretKey);
const requireLogin   = require('../midlewares/requireLogin');
 
router.post('/api/stripe', requireLogin, async (req, res) => {
  
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  //MAYBE WE SHOULD TRY CATCH ON CHARGE REQUEST TO MAKE SURE IT IS CHARGED BEFORE GIVING CREDITS
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  

});

module.exports = router;