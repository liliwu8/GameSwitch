import { Image } from 'react-bootstrap';
import './GameSwitchDescription.css';
import trade from './trading.png';
function GameSwitchDescription() {
  return (
    <div className='gameswitchdescription'>
      <h2 className='titleDes'>How It Works</h2>
      <br />
      <section className='instructionCard'>
        <h4>
          This is a platform for gamers to interact with local peers by trading
          video games. Game Switch provides an alternative way of refreshing
          your game collection.
        </h4>
      </section>
      <ol className='instructionCard'>
        <li>
          To make the most out of this site, users need to make an account
        </li>
        <li>Game Switchers can search for local users in their area</li>
        <li>A users page contains their short bio and game library</li>
        <li>
          See a game you like? click on it and offer up a trade with one of your
          games
        </li>
        <li>Manage your Current Trade requests and Offers</li>
        {/* <Image src='https://i.imgur.com/h2FOgqH.png' alt='login' /> */}
      </ol>
      <p className='tradepic'>
        <strong>Swap Works</strong>
      </p>
      <Image src={trade} alt='trade' className='tradepic' />
    </div>
  );
}
export default GameSwitchDescription;
