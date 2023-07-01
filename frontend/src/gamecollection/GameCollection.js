import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Card, Container, Row, Col } from 'react-bootstrap'
import './GameCollection.css'
const API = process.env.REACT_APP_API_URL //localhost:3333

export default function GameCollection({ gameCollection, setGameCollection }) {
  const navigate = useNavigate()
  const { currentUser } = useContext(CurrentUserContext)
  // const [gameCollection, setGameCollection] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(`${API}/loggedin/${currentUser.user_id}/games`)
  //     .then((res) => {
  //       if (res.success) {
  //       }
  //       setGameCollection(res.data.payload)
  //     })
  //     .catch((error) => console.error('catch', error))
  // }, [currentUser.user_id])

  function deleteGame(index, game_id) {
    const newGameCollection = [...gameCollection]
    newGameCollection.splice(index, 1)

    //console.log(newGameCollection);
    axios
      .delete(`${API}/loggedin/${currentUser.user_id}/games/${game_id}`)
      .then((res) => {
        setGameCollection(newGameCollection)
      })
      .catch((error) => console.error('catch', error))
  }

  // const games = gameCollection.map((game, index) => {
  //   return (
  //     <Card key={index} style={{ width: '16rem' }} className='game'>
  //       <Card.Img
  //         src={game.game_img}
  //         style={{ height: '250px', width: '225px' }}
  //         className='gameimg'
  //       />
  //       <Card.Body>
  //         <Card.Title>{game.game_name}</Card.Title>
  //         <br />
  //         <button
  //           className='deletegame'
  //           onClick={() => {
  //             deleteGame(index, game.game_id)
  //           }}
  //         >
  //           Delete Game
  //         </button>
  //         <br />
  //         <br />
  //         <Link to={`/updategame/${game.game_id}`}>
  //           <button className='updategame'>Update Game</button>
  //         </Link>
  //       </Card.Body>
  //     </Card>
  //   )
  // })
  // return (
  //   <Col>
  //     <Link to='/addnewgame'>
  //       <button className='addgame'>Add Game</button>
  //     </Link>
  //     <Row >
  //       {games.length !== 0 ? (
  //         games
  //       ) : (
  //         <img
  //           src='https://pa1.narvii.com/6721/8f5e4ae373279198ffc1bd980a52b52d4f9566ba_hq.gif'
  //           alt='gameover'
  //         />
  //       )}
  //     </Row>
  //   </Col>

  // )
  return (
    <div className='game-cards'>
      {gameCollection.map((game, index) => (
        <div className='game-card' key={index}>
          <div>
            <img className='game-image' src={game.game_img} alt='gamepic' />
          </div>
          <p className='game-name'>{game.game_name}</p>
          <div className='game-editdelete'>
            <FaTrashAlt
              className='game-update'
              onClick={() => {
                deleteGame(index, game.game_id)
              }}
              size={20}
            />

            <FaEdit
              size={20}
              onClick={() => navigate(`/updategame/${game.game_id}`)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
