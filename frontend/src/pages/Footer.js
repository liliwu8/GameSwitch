import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import logo from '../components/logo.png'

export default function Footer() {
  return (
    // <footer className='footer'>
    //   <div className='footer-container'>
    //     <div className='footer-item'>
    //       <Link to='/about'>
    //         <h4>About Us</h4>
    //       </Link>
    //     </div>
    //     {/* <div className='footer-item'>
    //       <h4>Contact Us</h4>
    //     </div> */}
    //     <div className='footer-item'>
    //       <Link to='/tutorial'>
    //         <h4>How It Works</h4>
    //       </Link>
    //     </div>
    //     <div className='footer-item'>
    //       <a href='https://github.com/liliwu8/GameSwitch'>
    //         <h4> Project Source Code</h4>
    //       </a>
    //     </div>
    //   </div>
    //   <p className='copyright'>Copyright ©2022 Game Switch NYC</p>
    // </footer>
    <footer className='footer'>
      <div className='footer__addr'>
        {/* <h1 className='footer__logo'>GameSwitchNYC</h1> */}
        <img src={logo} className='footer__logo' />
        <h2>Contact</h2>
        <address>
          5534 NYC 22193-10212
          <br />
          <a className='footer__btn' href='mailto:example@gmail.com'>
            Email Us
          </a>
        </address>
      </div>

      <ul className='footer__nav'>
        <li className='nav__item'>
          <h2 className='nav__title'>GameSwitch</h2>

          <ul className='nav__ul'>
            <Link to='/about'>
              <li>About Us</li>
            </Link>
            <li>
              <a href='#'>Contact</a>
            </li>
            <Link to='/tutorial'>
              <li>How It Works</li>
            </Link>
          </ul>
        </li>

        <li className='nav__item nav__item--extra'>
          <h2 className='nav__title'>Categories</h2>
          <ul className='nav__ul nav__ul--extra'>
            <li>
              <a href='#'>PlayStation</a>
            </li>
            <li>
              <a href='#'>Nintendo</a>
            </li>
            <li>
              <a href='#'>Xbox</a>
            </li>
          </ul>
        </li>

        <li className='nav__item'>
          <h2 className='nav__title'>Legal</h2>
          <ul className='nav__ul'>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
            <li>
              <a href='#'>Terms of Use</a>
            </li>
            <li>
              <a href='#'>Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className='legal'>
        <p>&copy; 2022 GameSwitchNYC. All rights reserved.</p>
      </div>
    </footer>
  )
}
