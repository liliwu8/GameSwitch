import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      {/* <img src='https://static.standard.co.uk/2020/12/07/11/topgames2020compositejpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart' className='home-image'/> */}
      <div className='banner-section'>
        <img
          src='https://static.standard.co.uk/2020/12/07/11/topgames2020compositejpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart'
          className='home-image' alt='pic'
        />
        <section class='hero-header-text'>
          <h1 className='home-title'>Welcome To Game Switch NYC!</h1>
          <h2 className='slogan'>Game Connect Repeat</h2>
        </section>
      </div>
      <div className='features-container'>
        <div className='feature'>
          <h2 className='feature-title'>Game</h2>
          <p className='feature-description'>
            Creating your own gaming libaray to trade with local users. Allowing
            users to view and manage the games they own physical.
          </p>
        </div>
        <div className='feature'>
          <h2 className='feature-title'>Connect</h2>
          <p className='feature-description'>
            Users can connect with local peers by trading video games and
            meeting up in person. Connecting with like-minded users with the
            same interest.
          </p>
        </div>
        <div className='feature'>
          <h2 className='feature-title'>Repeat</h2>
          <p className='feature-description'>
            Trading games through other users can be a great way to get rid of
            games they no longer want, while also acquiring new games to play.
          </p>
        </div>
      </div>
      {/* <img src='https://cdn.dribbble.com/users/989157/screenshots/3825479/comp-4_1.gif' className='home-image' alt='gif' /> */}
    </div>
  );
}
export default Home;
