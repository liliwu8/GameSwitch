import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { FaComments } from 'react-icons/fa'

import './Forum.scss'
import { CurrentUserContext } from './CurrentUserContext'
import { Link } from 'react-router-dom'
const API = process.env.REACT_APP_API_URL

const Forum = () => {
  const [thread, setThread] = useState([])
  const { currentUser } = useContext(CurrentUserContext)

  useEffect(() => {
    axios
      .get(`${API}/thread`)
      .then((res) => {
        setThread(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const formatTimeElapsed = (date) => {
    var now = new Date() // Get the current time
    var elapsed = now - date // Calculate the time difference in milliseconds

    // Convert elapsed time to seconds, minutes, hours, days, months, and years
    var seconds = Math.floor(elapsed / 1000)
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    var days = Math.floor(hours / 24)
    var months = Math.floor(days / 30.4375)
    var years = Math.floor(months / 12)

    // Format the elapsed time based on the highest non-zero unit
    if (years > 0) {
      return years + ' year' + (years > 1 ? 's' : '') + ' ago'
    } else if (months > 0) {
      return months + ' month' + (months > 1 ? 's' : '') + ' ago'
    } else if (days > 0) {
      return days + ' day' + (days > 1 ? 's' : '') + ' ago'
    } else if (hours > 0) {
      return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago'
    } else if (minutes > 0) {
      return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago'
    } else {
      return seconds + ' second' + (seconds > 1 ? 's' : '') + ' ago'
    }
  }

  return (
    <div className='forum'>
      <div className='forum__container'>
        <ul className='forum__cards'>
          {thread.map((thread, index) => {
            return (
              <li key={index} className='forum__card'>
                <div className='forum__content'>
                  <img
                    src={thread.user_avatar}
                    alt='avatar'
                    className='forum__avatar'
                  />
                  <div className='forum__contentInfo'>
                    <div className='forum__title'>
                      <Link to={`/thread/${thread.thread_id}`}>
                        {thread.thread_title}
                      </Link>
                    </div>

                    <p className='forum__authorAndTime'>
                      Posted By: {thread.user_name}
                      <span>
                        {' '}
                        {formatTimeElapsed(new Date(thread.thread_created))}
                      </span>
                    </p>
                    <p className='forum__postContent'>{thread.thread_body}</p>
                   
                  </div>
                  <div className='forum__comments'>
                      {' '}
                      <FaComments size={16} />
                      <span>{thread.post_count}</span>
                    </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {currentUser.user_name ? (
        <button className='forum__createThreadButton'>
          <Link to='/thread/newThread'>Create Thread</Link>
        </button>
      ) : (
        <button className='forum__loginButton'>
          <Link to='/login'>Please Login</Link>
        </button>
      )}
    </div>
  )
}
export default Forum
