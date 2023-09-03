import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import SignOut from '../firebaseTest/Signout'
import { CurrentUserContext } from './CurrentUserContext'
import './NavBar.css'
import { HiMenu } from 'react-icons/hi'

function NavBar() {
  const { currentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
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
          <HiMenu size={30} />
        </div>
        {Object.keys(currentUser).length ? (
          <ul
            className={`navbar__menuItems ${
              openMenu ? 'navbar__menu__open' : ''
            }`}
          >
            <li onClick={() => navigate('/users')} className='navbar__menuItem'>
              User
            </li>
            <li onClick={() => navigate('/forum')} className='navbar__menuItem'>
              Forum
            </li>
            <li
              className='navbar__menuItem'
              onClick={() => navigate('/userprofile')}
            >
              {currentUser.user_name}'s Profile
            </li>
            <SignOut />
          </ul>
        ) : (
          <ul
            className={`navbar__menuItems ${
              openMenu ? 'navbar__menu__open' : ''
            }`}
          >
            <li onClick={() => navigate('/users')} className='navbar__menuItem'>
              Users
            </li>
            <li onClick={() => navigate('/forum')} className='navbar__menuItem'>
              Forum
            </li>
            <li onClick={() => navigate('/login')} className='navbar__menuItem'>
              Login
            </li>
            <li
              onClick={() => navigate('/signup')}
              className='navbar__menuItem'
            >
              Sign Up
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
export default NavBar
