import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../components/CurrentUserContext'
import './CreateThread.scss'
const API = process.env.REACT_APP_API_URL

function CreateThread() {
  const { currentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  const [thread, setThread] = useState({
    thread_title: '',
    thread_body: '',
  })

  const handleTextChange = (event) => {
    setThread({ ...thread, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newThread = { ...thread }
    newThread.thread_user_id = currentUser.user_id
    axios
      .post(`${API}/thread/newthread`, newThread)
      .then((res) => {
        setThread(res.data.payload)
        navigate(`/forum`)
      })
      .catch((err) => {
        console.warn(err)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <label for='thread_title'>Thread Title</label>
        <br />
        <input
          type='text'
          id='thread_title'
          onChange={handleTextChange}
          value={thread.thread_title}
        />
        <br />
        <br />
        <textarea
          className='text-thread'
          id='thread_body'
          value={thread.thread_body}
          onChange={handleTextChange}
          placeholder='Enter your post...'
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default CreateThread
