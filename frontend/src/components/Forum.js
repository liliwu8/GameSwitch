import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Forum.scss'
import { Link, useParams } from 'react-router-dom'
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
    <div className='forumBody'>
      <table className='forumBody__forumtable'>
        <tbody className='forumBody__forumTableBody'>
          <tr>
            <th>Thread</th>
            <th>Author</th>
            <th>Post Created</th>
          </tr>
          {thread.map((data, index) => (
            <tr key={index} className='forumBody__info'>
              <td>
                <Link to={`/thread/${data.thread_id}`}>
                  {data.thread_title}
                </Link>
              </td>
              <td>
                {matchUsertoThread(data.thread_user_id)}
                
              </td>
              <td>{ convertToEST(data.thread_created).slice(0, 13)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <table>
    //   <colgroup>
    //     <col className='w70p'></col>
    //     <col className='w10p'></col>
    //     <col className='w10p'></col>
    //     <col className='w10p'></col>
    //   </colgroup>
    //   <thread>
    //     <tr>
    //       <th>Thread</th>
    //       <th>author</th>
    //       <th>Posts</th>
    //       <th>Last Post</th>
    //     </tr>
    //     <tbody>
    //       {thread.map((data, index) => (
    //         <tr key={index}>
    //           <td>
    //             <Link to={`/thread/${data.thread_id}`}>
    //               {data.thread_title}
    //             </Link>
    //           </td>
    //           <td>{matchUsertoThread(data.thread_user_id)}</td>
    //           <td>
    //             {}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </thread>
    // </table>
  )
}

export default Forum
