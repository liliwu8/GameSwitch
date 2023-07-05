import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CurrentUserContext } from './CurrentUserContext'
import PostThreadForm from './PostThreadForm'
import axios from 'axios'
import ThreadPost from './ThreadPost'
import './Thread.scss'


const API = process.env.REACT_APP_API_URL

function Thread() {
  const [thread, setThread] = useState([])
  const { threadId } = useParams()

  const { currentUser } = useContext(CurrentUserContext)
  useEffect(() => {
    axios
      .get(`${API}/thread/${threadId}`)
      .then((res) => {
        let data = res.data.payload.sort((a, b) => a.post_id - b.post_id)
        setThread(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [threadId])

 

  const handleEdit = (updatedpost) => {
    axios
      .put(`${API}/post/updatepost/${threadId}`, updatedpost)
      .then((res) => {
        console.log(res)
        let data = res.data.payload.sort((a, b) => a.post_id - b.post_id)
        setThread(data)
      })
      .catch((c) => console.warn('catch', c))
  }

  const handleSubmit = (post) => {
    axios
      .post(`${API}/post/newpost`, {
        ...post,
        post_user_id: currentUser.user_id,
        post_thread_id: threadId,
      })
      .then((res) => {
        let data = res.data.payload.sort((a, b) => a.post_id - b.post_id)
        setThread(data)
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = (id) => {
    axios
      .delete(`${API}/post/deletepost/${id}`)
      .then(
        (res) => {
          const copyThreadArray = [...thread]
          const indexDeletedThread = copyThreadArray.findIndex((thread) => {
            return thread.post_id === id
          })
          copyThreadArray.splice(indexDeletedThread, 1)
          setThread(copyThreadArray)
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c))
  }
  console.log(currentUser.username)
  return (
    <div className='post-box'>
      {thread[0] && (
        <div>
          <h1>{thread[0].thread_title}</h1>
          {thread.map((thread) => (
            <ThreadPost
              thread={thread}
              handleSubmit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {currentUser.user_name ? (
        <PostThreadForm
          setThread={setThread}
          threadId={threadId}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className='post-box__login'>
            <button className='post-box__loginButton'><Link to='/login'>Please Login </Link></button>
         
        </div>
      )}
     
    </div>
  )
}

export default Thread
