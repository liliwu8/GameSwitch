import { GrGamepad } from 'react-icons/gr'
import { FaUserFriends, FaComments } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { BiTimeFive } from 'react-icons/bi'
import './Home.scss'
// import Nintendo from './Nintendo.png'
// import playstation from './playstation.png'
// import xbox from './xbox.png'
import banner from './banner.jpeg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import GetTradeScore from '../tradeRequestRecords/getTradeScore'
const API = process.env.REACT_APP_API_URL

function Home() {
  // const [game, setGame] = useState([])
  // const [selectGame, setSelectGame] = useState([])
  // const [activeFilter, setActiveFilter] = useState('All');
  const [thread, setThread] = useState([])
  const [user, setUser] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(`${API}/games`)
  //     .then((res) => {
  //       setGame(res.data.payload)
  //       setSelectGame(res.data.payload)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])
  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        let data = res.data.payload.sort(
          (a, b) => b.user_trade_score - a.user_trade_score
        ) 
        setUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${API}/thread`)
      .then((res) => {
        setThread(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const formatTimeElapsed = (date) => {
    var now = new Date() // Get the current time
    var elapsed = now - date // Calculate the time difference in milliseconds

    // Convert elapsed time to seconds, minutes, hours, days, months, and years
    var seconds = Math.floor(elapsed / 1000)
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    var days = Math.floor(hours / 24)
    var months = Math.floor(days / 30.4375)
    var years = Math.floor(months / 12)

    // Format the elapsed time based on the highest non-zero unit
    if (years > 0) {
      return years + ' year' + (years > 1 ? 's' : '') + ' ago'
    } else if (months > 0) {
      return months + ' month' + (months > 1 ? 's' : '') + ' ago'
    } else if (days > 0) {
      return days + ' day' + (days > 1 ? 's' : '') + ' ago'
    } else if (hours > 0) {
      return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago'
    } else if (minutes > 0) {
      return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago'
    } else {
      return seconds + ' second' + (seconds > 1 ? 's' : '') + ' ago'
    }
  }
  // const handleFilterGame = (event) => {
  //   if (event.target.value === 'All') {
  //     setSelectGame([...game])
  //   } else {
  //     let filterGame = game.filter(
  //       (game) => game.game_brand === event.target.value
  //     )
  //     setSelectGame(filterGame)
  //   }
  // }
console.log(user)
  return (
    <div className='home'>
      <div className='home__bannerSection'>
        <img
          // src='https://static.standard.co.uk/2020/12/07/11/topgames2020compositejpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart'
          src={banner}
          className='home__bannerImg'
          alt='pic'
        />
        <section className='home__headerText'>
          <h1 className='home__title'>Welcome To Game Switch NYC!</h1>
        </section>
      </div>
      <div className='home__featuresContainer'>
        <div className='home__feature'>
          <h2 className='home__featureTitle'>Game</h2>
          <GrGamepad size={50} />
          <p className='home__featureDescription'>
            Create your own gaming library to trade with local users. View and
            manage your library.
          </p>
        </div>
        <div className='home__feature'>
          <h2 className='home__featureTitle'>Connect</h2>
          <FaUserFriends size={50} />
          <p className='home__featureDescription'>
            Connect with local peers and trading video games or meet up in
            person. Connect with like-minded users.
          </p>
        </div>
        <div className='home__feature'>
          <h2 className='home__featureTitle'>Trade</h2>
          <FiRepeat size={50} />
          <p className='home__featureDescription'>
            Trading games with other users can be a great way to get rid of
            games you no longer want, and expand your library while saving
            money.
          </p>
        </div>
      </div>
      {/* <div className='gameBrand-container'>
        <h1 className='gameBrand-heading'>
          Top Brands.<span>Take Your Pick.</span>{' '}
        </h1>
        <div className='gameBrand-list'>
          <img src={Nintendo} alt='nintendo' className='gameBrand-nintendo' />

          <img
            src={playstation}
            alt='playstation'
            className='gameBrand-playstation'
          />
          <img src={xbox} alt='xbox' className='gameBrand-xbox' />
        </div>
      </div> */}

      {/* <div className='game-filter-container'>
        <button className={ activeFilter ==='All'? 'gamefilter-button:active':''} value='All' onClick={(e) => handleFilterGame(e)}>
          All
        </button>
        <button value='Playstation' onClick={(e) => handleFilterGame(e)}>
          PlayStation
        </button>
        <button value='Xbox' onClick={(e) => handleFilterGame(e)}>
          Xbox
        </button>
        <button value='Nintendo' onClick={(e) => handleFilterGame(e)}>
          Nintendo
        </button>
        <div className='gamefilter-cards'>
          {selectGame&&selectGame.map((game,index) => (
            <div className='gamefilter-card' key={index}>
              <div>
                <img
                  className='gamefilter-img'
                  src={game.game_img}
                  alt='gamepic'
                />
              </div>
              <p className='gamefilter-name'>{game.game_name}</p>
            </div>
          ))}
        </div>
      </div> */}
      <div className='home__forum'>
        <div className='home__forumContainer'>
          <h2 className='home__forumSection'>Forums</h2>
          <ul className='home__forumCards'>
            {thread
              .map((thread, index) => {
                return (
                  <li key={index} className='home__forumCard'>
                    <div className='home__forumContent'>
                      <div className='home__forumContentInfo'>
                        <div className='home__forumTitle'>
                          <Link to={`/thread/${thread.thread_id}`}>
                            {thread.thread_title}
                          </Link>
                        </div>
                        <div className='home__forumAuthorAndTime'>
                          <BiTimeFive />{' '}
                          {formatTimeElapsed(new Date(thread.thread_created))}
                        </div>
                      </div>
                      <div className='home__forumComments'>
                        <FaComments size={16} />{' '}
                        <span>{thread.post_count}</span>
                      </div>
                    </div>
                  </li>
                )
              })
              .slice(0, 10)}
          </ul>
        </div>
        <div className='home__topTraders'>
          <div className='home__topTraderContainer'>
            <h2>Top Traders</h2>

            <ol className='home__topTraderCards'>
              {user
                .map((user) => {
                  return (
                    <li className='home__topTraderCard'>
                      <Link to={`/users/${user.user_email}`}>
                        <div className='home__topTraderUser'>
                          <div className='home__topTraderUserContainer'>
                            {user.user_name}
                            {/* <GetTradeScore user_id={user.user_id} /> */}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })
                .slice(0, 10)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home

// <div className='game-cards'>
// {gameCollection.map((game, index) => (
//   <div className='game-card' key={index}>
//     <div>
//       <img className='game-image' src={game.game_img} alt='gamepic' />
//     </div>
//     <p className='game-name'>{game.game_name}</p>
//   </div>
// ))}
// </div>
