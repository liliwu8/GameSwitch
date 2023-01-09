import React from 'react';
import './Home.css';
// import hand from './hand.png';
// import videoGame from './videogame.png'
import { Container,Row,Col } from 'react-bootstrap';
function Home() {
  return (
    // <div className='home'>
    //   <h1 className='home-title'>Welcome To Game Switch NYC!</h1>
    //   <br></br>
    //   {/* <span class='start-btn'>START</span> */}
    //   <h2>Sign up or Log in to get started</h2>

    //   <img width="400" src="https://media2.giphy.com/media/fAD9SMlNWp0k84Ra1G/giphy.gif?cid=790b7611d3fec240996c139a98fa99ad753b3ea083818e0e&rid=giphy.gif&ct=g"></img>
    //   <img src='https://cdn.dribbble.com/users/989157/screenshots/3825479/comp-4_1.gif' />
    //   <div className='circle'></div>
    //   <img src={hand} alt='hand' className='hand-img' />
    //   <img src={ videoGame} alt='videogame' className='video-game'/>

    // </div>
    <Container >
      <h1 className='home-title'>Welcome To Game Switch NYC!</h1>
      <p className='lead text-center'>
        Game Connect Repeat
      </p>
      <Row my={3}>
        <Col md={4} className='feature'>
          <h3>Sign up</h3>
          <p>
           Create an account. Add games that you have want to trade in your collection.
          </p>
        </Col>
        <Col md={4} className='feature'>
          <h3>Trade In</h3>
          <p>
            Trade with users in your area.
          </p>
        </Col>
        <Col md={4} className='feature'>
          <h3>Meet Up</h3>
          <p>
           Contact each other where to meet up to trade your game. 
          </p>
        </Col>
      </Row>
      <div >
      <h4>Sign up or Log in to get started!</h4>
      </div>
    </Container>
  );
}
export default Home;
