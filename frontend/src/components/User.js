import axios from 'axios'
import './User.scss'
import { Image} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'
import GetTradeScore from '../tradeRequestRecords/getTradeScore'
const API = process.env.REACT_APP_API_URL

function User() {
  const { currentUser } = useContext(CurrentUserContext)
  const [user, setUser] = useState([])
  const [userGames, setUserGames] = useState([])
  const { user_email } = useParams()

  useEffect(() => {
    axios
      .get(`${API}/users/${user_email}`)
      .then((res) => {
        setUser(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user_email, user.user_id])

  useEffect(() => {
    axios
      .get(`${API}/loggedin/${user.user_id}/games`)
      .then((res) => {
        setUserGames(res.data.payload)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [user.user_id])

  const displaySocialMediaIcons = () => {
    if (currentUser.user_name) {
      return (
        <div>
          {user.user_facebook ? (
            <a href={user.user_facebook}>
              <Image
                style={{ width: '26px', margin: '10px' }}
                src='https://i.imgur.com/YeiuX4k.png'
              />
            </a>
          ) : null}
          {user.user_instagram ? (
            <a href={user.user_instagram}>
              <Image
                style={{ width: '26px', margin: '10px' }}
                src='https://i.imgur.com/dTKYTwR.png'
              />
            </a>
          ) : null}
          {user.user_twitch ? (
            <a href={user.user_twitch}>
              <Image
                style={{ width: '26px', margin: '10px' }}
                src='https://i.imgur.com/pSgUF1Y.jpg'
              />
            </a>
          ) : null}
        </div>
      )
    } else {
      return (
        <Link to='/login'>
          <button>Please Login</button>
        </Link>
      )
    }
  }

  return (
    <div className='user'>
      <div className='user__profile'>
        <div className='user__profileContainer'>
          <div className='user__card'>
            <img className='user__avatar' src={user.user_avatar} alt='Avatar' />

            <div className='user__bio'>{user.user_bio}</div>

            <div className='user__location'> 📍{user.user_location}</div>
            <div className='user__tradeGameScore'>
              Trade Score: {<GetTradeScore user_id={user.user_id} />}
            </div>
            <div className='user__email'>
              {currentUser.user_name ? user.user_email : null}
            </div>
            {displaySocialMediaIcons()}
          </div>
          <div className='user__gameCards'>
            {userGames &&
              userGames.map((game, index) => (
                <div className='user__gameCard' key={index}>
                  <Link to={`/games/${game.game_id}`}>
                    <div>
                      <img
                        className='user__gameImg'
                        src={game.game_img}
                        alt='gamepic'
                      />
                    </div>
                    <p className='user__gameName'>{game.game_name}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User

