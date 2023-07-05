import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import './AddNewGame.css'

//API url
const API = process.env.REACT_APP_API_URL

function AddNewGame() {
  const { currentUser } = useContext(CurrentUserContext)

  // //console.log("current user id is", currentUser.user_id);

  const [gameInfoInput, setGameInfoInput] = useState({
    game_name: '',
    game_img: '',
    game_description: '',
    game_brand: '',
    game_console: '',
  })

  const navigate = useNavigate()

  const AddNewGameToDataBase = () => {
    const newGame = { ...gameInfoInput }
    newGame.user_id = currentUser.user_id

    axios
      .post(`${API}/loggedin/${currentUser.user_id}/games`, newGame)
      .then(() => {
        navigate('/userprofile')
      })
      .catch((error) => console.error('catch', error))
  }

  const handleTextChange = (event) => {
    setGameInfoInput({
      ...gameInfoInput,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    AddNewGameToDataBase()
    setGameInfoInput({
      game_name: '',
      game_img: '',
      game_description: '',
      game_brand: '',
      game_console: '',
    })
    
  }
  return (
    <div className='game-form'>
      <div className='game-form-container'>
        <div className='game-form-innerContainer'>
          <form onSubmit={handleSubmit}>
            <div className='game-form-row'>
              <div className='game-form-col'>
                <label htmlFor='gameName' className='game-form-gameLabel'>Game Name</label>
                <input
                  className='game-form-name'
                  type='text'
                  id='game_name'
                  value={gameInfoInput.game_name}
                  onChange={handleTextChange}
                  placeholder='Enter game name'
                  required
                />
              </div>
              <div className='game-form-col'>
                <label htmlFor='gameImage' className='game-form-gameLabel'>Game Image</label>
                <input
                  type='text'
                  id='game_img'
                  placeholder='Enter game image URL'
                  className='game-form-img'
                  onChange={handleTextChange}
                  value={gameInfoInput.game_img}
                  required
                />
              </div>
            </div>
            <div className='game-form-row'>
              <div className='game-form-col'>
                <label htmlFor='gameBrand' className='game-form-gameLabel'>Game Brand</label>
                <input
                  type='text'
                  id='game_brand'
                  placeholder='Enter game brand'
                  className='game-form-brand'
                  onChange={handleTextChange}
                  value={gameInfoInput.game_brand}
                  required
                />
              </div>
              <div className='game-form-col'>
                <label htmlFor='gameConsole' className='game-form-gameLabel'>Game Console</label>
                <input
                  type='text'
                  id='game_console'
                  placeholder='Enter game console'
                  className='game-form-console'
                  onChange={handleTextChange}
                  value={gameInfoInput.game_console}
                  required
                />
              </div>
            </div>
            <div className='game-form-row'>
              <div className='game-form-col-full'>
                <label htmlFor='gameDescription' className='game-form-gameLabel'>Game Description</label>
                <textarea
                  id='game_description'
                  placeholder='Enter game description'
                  className='game-form-description'
                  onChange={handleTextChange}
                  value={gameInfoInput.game_description}
                  required
                />
              </div>
            </div>
            <div className='game-form-row'>
              <button  type='submit' className='game-form-submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewGame


