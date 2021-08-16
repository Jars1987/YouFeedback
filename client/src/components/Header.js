import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Payments from './Payments';

const Header = () => {

  const auth = useSelector((state) => state.auth)

  const renderContent = () => {
    switch (auth){
      case null:
        return;

      case false:
        return (
          <>
            <li>Login with:</li>
            <li ><a href='/auth/google'><img  style={{marginTop: '20px'}}src='/images/google.png' alt='Google'/></a></li>
            <li><a href='/auth/facebook'><img style={{marginTop: '20px'}} src='/images/facebook.png' alt='Facebook'/></a></li>
            
        </>
        )
      
      default:
        return (
          <>
           <li style={{marginRight: '15px'}}><Payments /></li>
           <li>Credits: {auth.credits}</li>
           <li><a href='/api/logout'>Logout</a></li>
          </>
        ) 

    }
 
  }

  console.log(auth);
  return (
    <nav>
    <div className='nav-wrapper'>
      <Link to={auth ? '/surveys' : '/'} style={{marginLeft: '0.5rem'}} className='left brand-logo'>YouFB</Link>
      <ul className='right'>
        {renderContent()}
      </ul>
      
    </div>
  </nav>

  )
};



export default Header;