import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './SearchBar.css'
const API = process.env.REACT_APP_API_URL

function SearchBar() {
  const [games, setGames] = useState([])
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    axios
      .get(`${API}/games`)
      .then((res) => {
        setGames(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const inputHandler = (event) => {
    let textLowerCase = event.target.value.toLowerCase()
    setUserInput(textLowerCase)
  }

  const SearchHandleClick = (input) => {
    setUserInput(input)
    setUserInput('')
  }

  const searchResult = (userInput) => {
    let filterGame = games.filter((game) =>
      game.game_name.toLowerCase().includes(userInput)
    )
    return filterGame.length ? (
      filterGame.map((game, index) => (
        <Link to={`/games/${game.game_id}`} style={{ textDecoration: 'none' }}>
          <ul
            className='dropdown-row'
            key={index}
            onClick={() => SearchHandleClick(game.game_name)}
          >
            {' '}
            <img
              src={game.game_img}
              style={{ width: '60px', height: '59px', paddingRight: '10px' }}
            />
            <li>{game.game_name}</li>
          </ul>
        </Link>
      ))
    ) : (
      <ul className='dropdown-row-no-result'>
        <li>No Result</li>
      </ul>
    )
  }
  return (
    <div className='search-bar'>
      <input
        input='text'
        onChange={inputHandler}
        value={userInput}
        placeholder='Search Games'
        className='form-input'
      />
      <div id='dropdown'>
        {userInput.length > 0 ? searchResult(userInput) : null}
      </div>
    </div>
  )
}

export default SearchBar
