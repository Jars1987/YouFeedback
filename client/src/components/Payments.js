import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch} from 'react-redux';
import * as actions from './../actions';


  const Payments = () => {

  const dispatch = useDispatch();

  return (
    <StripeCheckout 
    name='YouFeedback'
    description='$5 for 5 email credits'
    amount={500}
    token={token => dispatch(actions.handleToken(token))}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}   
  >
   <button className='btn'>ADD CREDITS</button>
  </StripeCheckout>
  )
}

export default Payments;