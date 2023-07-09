import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import './GameCollection.css'
const API = process.env.REACT_APP_API_URL //localhost:3333

export default function GameCollection({ gameCollection, setGameCollection }) {
  const navigate = useNavigate()
  const { currentUser } = useContext(CurrentUserContext)

  function deleteGame(index, game_id) {
    const newGameCollection = [...gameCollection]
    newGameCollection.splice(index, 1)

    axios
      .delete(`${API}/loggedin/${currentUser.user_id}/games/${game_id}`)
      .then((res) => {
        setGameCollection(newGameCollection)
      })
      .catch((error) => console.error('catch', error))
  }

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
              className='game-delete'
              onClick={() => {
                deleteGame(index, game.game_id)
              }}
              size={20}
            />

            <FaEdit
              className='game-update'
              size={20}
              onClick={() => navigate(`/updategame/${game.game_id}`)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
