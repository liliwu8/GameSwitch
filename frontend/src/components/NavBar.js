import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
// import { Navbar } from 'react-bootstrap'
import { useContext, useState } from 'react'
import SignOut from '../firebaseTest/Signout'
import { CurrentUserContext } from './CurrentUserContext'
import './NavBar.css'

function NavBar() {
  const { currentUser } = useContext(CurrentUserContext)
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    onClickHandler(!openMenu) 
  }

  const onClickHandler=(openMenu)=>{
    var content = document.querySelector("main");
  
    if(openMenu){
       content.setAttribute( 'class', 'push-down' );
  
    }else{
       content.setAttribute( 'class', '' );
    }
  }

  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo' />
          </Link>
        </div>
        <div className='navbar__search'>
          <SearchBar />
        </div>
        <div
          className='navbar__hamburger'
          style={{ display: 'none' }}
          onClick={toggleMenu}
        >
          =
        </div>
        {Object.keys(currentUser).length ? (
          <ul
            className={`navbar__menuItems ${
              openMenu ? 'navbar__menu__open' : ''
              }`}
            
          >
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/userprofile' className='userprofile'>
                {currentUser.user_name}'s profile
              </Link>
            </li>
            <SignOut />
          </ul>
        ) : (
          <ul
            className={`navbar__menuItems ${
              openMenu ? 'navbar__menu__open' : ''
            }`}
          >
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='signup'>Sign Up</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
export default NavBar
