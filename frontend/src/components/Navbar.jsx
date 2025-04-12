import React, { useState } from 'react';
import '../stylesheet/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <button className="login-btn">Login</button>
          <button className="signup-btn">signup</button>
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