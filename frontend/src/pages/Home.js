import React, { useEffect, useState } from 'react'
import { GrGamepad } from 'react-icons/gr'
import { FaUserFriends } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import './Home.css'
import Nintendo from './Nintendo.png'
import playstation from './playstation.png'
import xbox from './xbox.png'
import banner from './banner.jpeg'
import { Link } from 'react-router-dom'

function Home() {
  const [thread, setThread] = useState()

  useEffect(() => {
    
  },[])

  return (
    <div className='home'>
      <div className='banner-section'>
        <img
          // src='https://static.standard.co.uk/2020/12/07/11/topgames2020compositejpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart'
          src={banner}
          className='home-image'
          alt='pic'
        />
        <section class='hero-header-text'>
          <h1 className='home-title'>Welcome To Game Switch NYC!</h1>
        </section>
      </div>
      <div className='features-container'>
        <div className='feature'>
          <h2 className='feature-title'>Game</h2>
          <GrGamepad size={50} />
          <p className='feature-description'>
            Create your own gaming library to trade with local users. View and
            manage your library.
          </p>
        </div>
        <div className='feature'>
          <h2 className='feature-title'>Connect</h2>
          <FaUserFriends size={50} />
          <p className='feature-description'>
            Connect with local peers and trading video games or meet up in
            person. Connect with like-minded users.
          </p>
        </div>
        <div className='feature'>
          <h2 className='feature-title'>Trade</h2>
          <FiRepeat size={50} />
          <p className='feature-description'>
            Trading games with other users can be a great way to get rid of
            games you no longer want, and expand your library while saving
            money.
          </p>
        </div>
      </div>
       <div className='gameBrand-container'>
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
        </div>
      <div>
        <div className='join-banner'>
          Join The Community <Link to='/forum'>Forum</Link>
        </div>
      </div>
      <div>
        <div>
        </div>
      </div>
    </div>
  )
}
export default Home
