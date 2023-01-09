import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../components/CurrentUserContext';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import './AddNewGame.css';

//API url
const API = process.env.REACT_APP_API_URL;

function AddNewGame() {
  const { currentUser } = useContext(CurrentUserContext);

  //console.log("current user id is", currentUser.user_id);

  const [gameInfoInput, setGameInfoInput] = useState({
    game_name: '',
    game_img: '',
    game_description: '',
    game_brand: '',
    game_console: '',
  });

  const navigate = useNavigate();

  const AddNewGameToDataBase = () => {
    const newGame = { ...gameInfoInput };
    newGame.user_id = currentUser.user_id;

    axios
      .post(`${API}/loggedin/${currentUser.user_id}/games`, newGame)
      .then(() => {
        navigate('/gamecollection');
      })
      .catch((error) => console.error('catch', error));
  };

  const handleTextChange = (event) => {
    setGameInfoInput({
      ...gameInfoInput,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddNewGameToDataBase();
    setGameInfoInput({
      game_name: '',
      game_img: '',
      game_description: '',
      game_brand: '',
      game_console: '',
    });
  };

  return (
    <section className='add-game'>
      <h2>Add New Game Page</h2>
      <Form onSubmit={handleSubmit} className='form'>
        <div className='input-add'>
          <Form.Group>
            <Form.Label htmlFor='game_name'>Game Name: </Form.Label>
            <Form.Control
              id='game_name'
              value={gameInfoInput.game_name}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor='game_img'>Game Image: </Form.Label>
            <Form.Control
              id='game_img'
              value={gameInfoInput.game_img}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor='game_description'>
              Game Description:{' '}
            </Form.Label>
            <Form.Control
              id='game_description'
              value={gameInfoInput.game_description}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor='game_brand'>Game Brand: </Form.Label>
            <Form.Control
              id='game_brand'
              value={gameInfoInput.game_brand}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor='game_console'>Game Console: </Form.Label>
            <Form.Control
              id='game_console'
              value={gameInfoInput.game_console}
              type='text'
              onChange={handleTextChange}
              required
            />
          </Form.Group>
        </div>
        <br />
        <input type='submit' value='Add New Game' className='add-game-button' />
      </Form>
      <br />
      <button className='add-game-button'>
        <Link to='/gamecollection'>Go Back</Link>
      </button>
    </section>
  );
}

export default AddNewGame;
