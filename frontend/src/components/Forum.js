import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Forum.scss'
import { Link} from 'react-router-dom'
const API = process.env.REACT_APP_API_URL

const Forum = () => {
  const [users, setUsers] = useState([])
  const [thread, setThread] = useState([])

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

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const matchUsertoThread = (id) => {
    for (let user of users) {
      if (user.user_id === id) {
        return user.user_name
      }
    }
  }

  return (
    <table className='forum-table'>
      <thead>
        <tr>
          <th>Thread</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {thread.map((data, index) => (
          <tr key={index}>
            <td>
              <Link to={`/thread/${data.thread_id}`}>{data.thread_title}</Link> 
            </td>
            <td>{matchUsertoThread(data.thread_user_id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Forum
