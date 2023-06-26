import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PostForm from './PostForm'
import './Thread.scss'
const API = process.env.REACT_APP_API_URL

function Thread() {
  const [thread, setThread] = useState([])
  const { threadId } = useParams()

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

  function convertToEST(dateString) {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'America/New_York',
    }
    return date.toLocaleString('en-US', options)
  }

  function getMinutesAgo(timeString) {
    const currentTime = new Date()
    const pastTime = new Date(timeString)
    const diffInMilliseconds = currentTime - pastTime
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
    return diffInMinutes
  }
  // {reviews.map((review, idx) => (
  //   <Review
  //     idx={idx}
  //     reviewer={review.reviewer}
  //     key={review.id}
  //     review={review}
  //     handleDelete={handleDelete}
  //     handleSubmit={handleEdit}
  //     loggedUser={loggedUser}
  //   />
  return (
    <div className='post-box'>
      {thread[0] && (
        <div>
          <h1>{thread[0].thread_title}</h1>
          {thread.map((thread) => (
            <div key={thread.thread_id} className='post'>
              <div className='post__userAvatar'>
                <img src={thread.user_avatar} alt='avatar' />
              </div>
              <div className='post__message'>
                <div class='post__messagecontainer'>
                  <div className='post__username'>{thread.user_name}</div>
                  <article className='post__messagesbox'>
                    <p className='post__messagecontent'>
                      {thread.post_content}
                    </p>
                  </article>
                  <div>{convertToEST(thread.post_created)}</div>
                  <button>editPost</button>
                </div>
              </div>
            </div>
          ))}
          <div>
            <Link to='/login'>please sign in</Link>
          </div>
          <PostForm setThread={setThread} threadId={threadId} />
        </div>
      )}
    </div>
  )
}

export default Thread
