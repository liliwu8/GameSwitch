import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import './UserProfile.css'
import GetTradeScore from '../tradeRequestRecords/getTradeScore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit,faInbox } from '@fortawesome/free-solid-svg-icons'
import { MdOutlineLockReset } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import GameCollection from '../gamecollection/GameCollection'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext)
  const [gameCollection, setGameCollection] = useState([])

  useEffect(() => {
    if (currentUser.user_id) {
      axios
        .get(`${API}/loggedin/${currentUser.user_id}/games`)
        .then((res) => {
          if (res.success) {
          }
          setGameCollection(res.data.payload)
        })
        .catch((error) => console.error('catch', error))
    }
  }, [currentUser.user_id])


  return (
    <div>
      <div className='profile-page'>
        <div className='profile-container'>
          <div className='user-profile'>
            <img
              className='avatar'
              src={currentUser.user_avatar}
              alt='Avatar'
            />

            <div className='profile-bio'>{currentUser.user_bio}</div>

            <div className='profile-location'>
              {' '}
              📍{currentUser.user_location}
            </div>
            <div className='profile-tradeGameScore'>
              Trade Score: {<GetTradeScore user_id={currentUser.user_id} />}
            </div>
            <div className='profile-email'>{currentUser.user_email}</div>
            <div>
              {currentUser.user_facebook ? (
                <a href={currentUser.user_facebook}>
                  <img
                    style={{ width: '26px', margin: '10px' }}
                    src='https://i.imgur.com/YeiuX4k.png'
                    alt='facebook'
                  />
                </a>
              ) : null}
              {currentUser.user_instagram ? (
                
                <a href={currentUser.user_instagram}>
                  <img  style={{ width: '26px', margin: '10px' }}src='https://i.imgur.com/dTKYTwR.png' alt='instagram' />
                </a>
              ) : null}
              {currentUser.user_twitch ? (
                <a href={currentUser.user_twitch}>
                  <img
                    style={{ width: '26px', margin: '10px' }}
                    src='https://i.imgur.com/pSgUF1Y.jpg'
                    alt='twitch'
                  />
                </a>
              ) : null}
            </div>
            <div className='profile-button'>
              <Link to='/resetpassword' title='reset password'>
                <MdOutlineLockReset size={28} className='profile-resetPassword'/>
              </Link>
              <Link to='/updateprofile' title='update profile'> 
                <FontAwesomeIcon icon={faUserEdit} size='lg' className='profile-updateprofile'/>
              </Link>
              <Link to='/traderequestrecords' title='trade inbox'><FontAwesomeIcon icon={faInbox} size='lg' className='profile-tradeRecords'/></Link>
             
              <Link to='/addnewgame' title='add game'>
                <FaPlus size={24} className='profile-addGame'/>
              </Link>
            </div>
          </div>
          {gameCollection[0] && (
            <GameCollection
              gameCollection={gameCollection}
              setGameCollection={setGameCollection}
            />
          )}
        </div>
      </div>
    </div>
  )
}
