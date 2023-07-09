import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import { Form, Image } from 'react-bootstrap'
import './UserProfileUpdate.css'

//API url
const API = process.env.REACT_APP_API_URL

function UserProfileUpdate() {
  const { currentUser } = useContext(CurrentUserContext)
  console.log(currentUser);

  const [userInput, setUserInput] = useState({
    user_name: '',
    user_location: '',
    user_avatar: '',
    user_bio: '',
    user_facebook: '',
    user_instagram: '',
    user_twitch: '',
  })

  useEffect(() => {
    if (currentUser.user_email) {
      axios
      .get(`${API}/users/${currentUser.user_email}`)
      .then((res) => {
        setUserInput(res.data.payload)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  }, [currentUser.user_email])
  const navigate = useNavigate()

  const updateProfile = () => {
    axios
      .put(`${API}/users/${currentUser.user_email}`, userInput)
      .then(() => {
        currentUser.user_name = userInput.user_name
        currentUser.user_location = userInput.user_location
        currentUser.user_avatar = userInput.user_avatar
        currentUser.user_bio = userInput.user_bio
        currentUser.user_facebook = userInput.user_facebook
        currentUser.user_instagram = userInput.user_instagram
        currentUser.user_twitch = userInput.user_twitch
        navigate('/userprofile')
      })
      .catch((error) => console.error('catch', error))
  }

  const handleTextChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProfile()
    setUserInput({
      user_password: '',
      user_confirmPassWord: '',
    })
  }

  const dino_avatar = 'https://i.imgur.com/tvpgFjs.png'
  const pig_avatar = 'https://i.imgur.com/9UDijyx.png'
  const unicorn_avatar = 'https://i.imgur.com/tadXFHu.png'
  const darkCat_avatar = 'https://i.imgur.com/BiZQKs5.png'
  const lightCat_avatar = 'https://i.imgur.com/P6gEYWf.png'
  const panda_avatar = 'https://i.imgur.com/D4DLHFw.png'

  return (
    <div className='updateprofile-form'>
      <div className='updateprofile-container'>
        <div className='updateprofile-innerContainer'>
          <form onSubmit={handleSubmit}>
            <div className='updateproflie-row'>
              <div className='updateprofile-col'>
                <label htmlFor='username' className='updateProfile-label'>Username</label>
                <input
                  className='updateprofile-username'
                  type='text'
                  id='user_name'
                  value={userInput.user_name}
                  onChange={handleTextChange}
                  placeholder='Enter user name'
                  required
                />
              </div>
              <div className='updateprofile-col'>
                <label htmlFor='userfacebook ' className='updateprofile-label'>Facebook</label>
                <input
                  type='text'
                  id='user_facebook'
                  placeholder='Enter facebook URL'
                  className='updateprofile-facebook'
                  onChange={handleTextChange}
                  value={userInput.user_facebook}
                  required
                />
              </div>
            </div>
            <div className='updateproflie-row'>
              <div className='updateprofile-col'>
                <label htmlFor='location' className='updateprofile-label'>Location</label>
                <br/>
                <select id='user_location' onChange={handleTextChange} value={userInput.user_location} className='updateprofile-location'>
                  <option value='Manhattan'>Manhattan</option>
                  <option value='Brooklyn'>Brooklyn</option>
                  <option value='Queens'>Queens</option>
                  <option value='Staten Island'>Staten Island</option>
                </select>
              </div>
              <div className='updateprofile-col'>
                <label htmlFor='instagram' className='updateprofile-label'>Instagram</label>
                <input
                  type='text'
                  id='user_instagram'
                  placeholder='Enter Instagram URL'
                  className='updateprofile-instagram'
                  onChange={handleTextChange}
                  value={userInput.user_instagram}
                  required
                />
              </div>
            </div>
            <div className='updateproflie-row'>
            <div className='updateprofile-col'>
                <label htmlFor='user-avatar' className='updateprofile-label'>Avatar</label>
                 <select id='user_avatar' onChange={handleTextChange} value={userInput.user_avatar} className='updateprofile-location'>
                  <option value={dino_avatar}>Dinosaur</option>
                  <option value={pig_avatar}>Pig</option>
                  <option value={unicorn_avatar}>Unicorn</option>
                  <option value={darkCat_avatar}>Dark Cat</option>
                  <option value={lightCat_avatar}>Light Cat</option>
                  <option value={panda_avatar}>Panda</option>
                </select>
              </div>
              <div className='updateprofile-col'>
                <label htmlFor='twitch' className='updateprofile-label'>Twitch</label>
                <input
                  type='text'
                  id='user_twitch'
                  placeholder='Enter Twitch URL'
                  className='updateprofile-twitch'
                  onChange={handleTextChange}
                  value={userInput.user_twitch}
                  
                />
              </div>
             
            </div>
            <div className='updateproflie-row'>
              <div className='updateprofile-col-full'>
                <label htmlFor='userBio'className='updateprofile-lable'>Bio</label>
                <br/>
                <textarea
                  id='user_bio'
                  placeholder='Enter bio'
                  className='updateprofile-userBio'
                  onChange={handleTextChange}
                  value={userInput.user_bio}
                  required
                />
              </div>
            </div>
            <div className='updateprofile-row'>
              <button type='submit' className='userprofile-submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfileUpdate
