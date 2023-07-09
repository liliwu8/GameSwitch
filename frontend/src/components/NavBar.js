import SearchBar from './SearchBar'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import SignOut from '../firebaseTest/Signout'
import { CurrentUserContext } from './CurrentUserContext'
import './NavBar.css'
import { HiMenu } from 'react-icons/hi'

function NavBar() {
  const { currentUser } = useContext(CurrentUserContext)
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
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='forum'>Forum</Link>
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
              <Link to='forum'>Forum</Link>
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
