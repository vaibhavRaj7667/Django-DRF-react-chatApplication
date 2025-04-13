import React, { useState } from 'react';
import '../stylesheet/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoginState, SignupState } from '../features/loginState/LoginSlice';

const Navbar = () => {
  const login_ = useSelector((state)=> state.login.mode)
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const HandelSignup=()=>{
    dispatch(SignupState())
    navigate('/login')
  }

  const HandelLogin=()=>{
    dispatch(LoginState())
    navigate('/login')
  }

  return (
    <div>
      <div className='nav'>
        <div className="logo-text">
          <h3>ChatWave</h3>
        </div>

       
        <div className="price desktop-nav">
          <button>Hello</button>
          <button>Testimonials</button>
          <button>Pricing</button>
        </div>

        <div className="desktop-nav">
          <button className="login-btn" onClick={HandelLogin}>Login</button>
          <button className="signup-btn" onClick={HandelSignup}>signup</button>
        </div>

        
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <button>hello</button>
        <button>Testimonials</button>
        <button>Pricing</button>
        <button className="login-btn">Login</button>
        <button className="signup-btn">signup</button>
      </div>
    </div>
  );
};

export default Navbar;