import { useState, useContext } from 'react'
import PostThreadForm from './PostThreadForm'
import { CurrentUserContext } from './CurrentUserContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

import './ThreadPost.scss'

function ThreadPost({ thread, handleSubmit, handleDelete }) {
  const [viewEditForm, toggleEditForm] = useState(false)
  const { currentUser } = useContext(CurrentUserContext)
  const toggleView = () => {
    toggleEditForm(!viewEditForm)
  }
  const convertToEST = (dateString) => {
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

  return (
    <div className='container'>
      {viewEditForm ? (
        <PostThreadForm
          toggleView={toggleView}
          handleSubmit={handleSubmit}
          threadDetails={thread}
        />
      ) : (
        <div key={thread.thread_id} className='post'>
          <div className='post__userAvatar'>
            <img src={thread.user_avatar} alt='avatar' />
          </div>
          <div className='post__message'>
            <div class='post__messagecontainer'>
              <div className='post__username'>{thread.user_name}</div>
              <article className='post__messagesbox'>
                <p className='post__messagecontent'>{thread.post_content}</p>
              </article>
              <div className='text-muted small'>{convertToEST(thread.post_created)}</div>
              {thread.post_id !== 0 &&
                currentUser.user_id === thread.post_user_id && (
                  <div className='post__icons'>
                    <FaEdit size={20} onClick={toggleView}className='post__editicon' />
                    <FaTrashAlt
                      size={20}
                      
                      onClick={() => handleDelete(thread.post_id)}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThreadPost
