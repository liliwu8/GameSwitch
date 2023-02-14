import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-item'>
          <Link to='/about'>
            <h4>About Us</h4>
          </Link>
        </div>
        {/* <div className='footer-item'>
          <h4>Contact Us</h4>
        </div> */}
        <div className='footer-item'>
          <Link to='/tutorial'>
            <h4>How It Works</h4>
          </Link>
        </div>
        <div className='footer-item'>
          <a href='https://github.com/liliwu8/GameSwitch'>
            <h4> Project Source Code</h4>
          </a>
        </div>
      </div>
      <p className='copyright'>Copyright ©2022 Game Switch NYC</p>
    </footer>

  );
}
