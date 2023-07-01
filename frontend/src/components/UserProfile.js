import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import from firebase
//import { onAuthStateChanged } from "firebase/auth";
//import auth from "../firebaseTest/firebaseAuth";
import axios from 'axios'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import './UserProfile.css'
import GetTradeScore from '../tradeRequestRecords/getTradeScore'
import { MdOutlineLockReset } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import GameCollection from '../gamecollection/GameCollection'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function UserProfile() {
  const { currentUser } = useContext(CurrentUserContext)
  const [gameCollection, setGameCollection] = useState([])
  const navigate = useNavigate()

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

  // console.log(
  //   "trade score",
  //   currentUser.user_id,
  //   GetTradeScore(currentUser.user_id)
  // );

  // return (
  //   <Container>
  //     <h1 className='username'>{`${currentUser.user_name}'s Profile`}</h1>
  //     <Row>
  //       <Col>
  //         <Card style={{ width: '20rem' }} className='userprofile'>
  //           <Card.Body>
  //             <Card.Title>{currentUser.user_name}</Card.Title>
  //             <Card.Img
  //               variant='top'
  //               style={{ width: '200px' }}
  //               src={currentUser.user_avatar}
  //             />
  //             <br></br>
  //             <br></br>
  //             <Card.Subtitle>
  //               Email:{' '}
  //               {currentUser.hasOwnProperty('user_email')
  //                 ? currentUser.user_email
  //                 : 'user email placeholder'}
  //             </Card.Subtitle>
  //             <br></br>
  //             <Card.Subtitle>
  //               Location: {currentUser.user_location}
  //             </Card.Subtitle>
  //             <br></br>
  //             <Card.Subtitle>{currentUser.user_bio}</Card.Subtitle>
  //             <br></br>
  //             <Card.Subtitle>
  //               Game Switch Score:{' '}
  //               {<GetTradeScore user_id={currentUser.user_id} />}
  //             </Card.Subtitle>
  //             {currentUser.user_facebook ? (
  //               <a href={currentUser.user_facebook}>
  //                 <Image
  //                   style={{ width: '50px', margin: '10px' }}
  //                   src='https://i.imgur.com/YeiuX4k.png'
  //                 />
  //               </a>
  //             ) : null}
  //             {currentUser.user_instagram ? (
  //               <a href={currentUser.user_instagram}>
  //                 <Image
  //                   style={{ width: '50px', margin: '10px' }}
  //                   src='https://i.imgur.com/dTKYTwR.png'
  //                 />
  //               </a>
  //             ) : null}
  //             {currentUser.user_twitch ? (
  //               <a href={currentUser.user_twitch}>
  //                 <Image
  //                   style={{ width: '50px', margin: '10px' }}
  //                   src='https://i.imgur.com/pSgUF1Y.jpg'
  //                 />
  //               </a>
  //             ) : null}
  //             <button id='user-profile-button'>
  //               <Link to='/resetpassword'>Reset Password</Link>
  //             </button>

  //             <button id='user-profile-button'>
  //               <Link to='/updateprofile'>Update Profile</Link>
  //             </button>

  //             <button id='user-profile-button'>
  //       <Link to='/gamecollection'>Game Collection</Link>
  //     </button>

  //             <button id='user-profile-button'>
  //               <Link to='/traderequestrecords'>Trade Records</Link>
  //             </button>
  //             <br />
  //             <br />
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //       <GameCollection />
  //     </Row>
  //   </Container>

  return (
    <div>
      {/* <h1 className='username'>{`${currentUser.user_name}'s Profile`}</h1> */}
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
            <div className='profile-button'>
              <Link to='/resetpassword' title='reset password'>
                <MdOutlineLockReset size={30} />
              </Link>

              <Link to='/traderequestrecords' title='trade inbox'></Link>

              <Link to='/addnewgame'title='add game'>
                <FaPlus size={20} />
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
