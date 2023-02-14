import { Image, Accordion } from 'react-bootstrap';
import './GameSwitchDescription.css';
import trade from './trading.png';
function GameSwitchDescription() {
  return (
    // <div className='gameswitchdescription'>
    //   <h2 className='titleDes'>How It Works</h2>
    //   <br />
    //   <section className='instructionCard'>
    //     <h4>
    //       This is a platform for gamers to interact with local peers by trading
    //       video games. Game Switch provides an alternative way of refreshing
    //       your game collection.
    //     </h4>
    //   </section>
    //   <ol className='instructionCard'>
    //     <li>
    //       To make the most out of this site, users need to make an account
    //     </li>
    //     <li>Game Switchers can search for local users in their area</li>
    //     <li>A users page contains their short bio and game library</li>
    //     <li>
    //       See a game you like? click on it and offer up a trade with one of your
    //       games
    //     </li>
    //     <li>Manage your Current Trade requests and Offers</li>
    //     {/* <Image src='https://i.imgur.com/h2FOgqH.png' alt='login' /> */}
    //   </ol>
    //   <p className='tradepic'>
    //     <strong>Swap Works</strong>
    //   </p>
    //   <Image src={trade} alt='trade' className='tradepic' />
    // </div>
    <div className='accordion'>
    <Accordion defaultActiveKey='0'>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>Do you need to be a member to trade?</Accordion.Header>
        <Accordion.Body>
        Yes! In order to trade you will need to create an account inorder to trade with us.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>Is it free of cost?</Accordion.Header>
        <Accordion.Body>
          Yes. Game Swtich NYC is a trading platform, that users can trade for free with out any cost. 
        </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
        <Accordion.Header>How do you manage trade?</Accordion.Header>
        <Accordion.Body>
         When you make a trade,it will take you to  your trading page that you can see  your incoming trade and outgoing trade.
        </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
        <Accordion.Header>What if I cancel my trade?</Accordion.Header>
        <Accordion.Body>
        If you cancel your trade be sure its an 24 hours before the trade happens, so it won't be inconvience. 
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      </div>
  );
}
export default GameSwitchDescription;
