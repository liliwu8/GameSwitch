import { useContext, useState } from 'react'
import { CurrentUserContext } from './CurrentUserContext'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;

function PostForm({threadId, setThread}) {
console.log(threadId)
  const [post, setPost] = useState({ post_content: '',post_thread_id:threadId })
  const { currentUser } = useContext(CurrentUserContext)
  
  const handleTextChange = (event) => {
    setPost({ ...post, [event.target.id]: event.target.value })
  }
  console.log()
  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios.post(`${API}/post/newpost`, { ...post, post_user_id: currentUser.user_id }).then((res) => {
      let data = res.data.payload.sort((a, b) => a.post_id - b.post_id)
      setThread(data)
    }).catch((error)=>console.log(error))
    setPost({ post_content: '' })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id='post_content'
          value={post.post_content}
          onChange={handleTextChange}
          placeholder='Enter your post...'
        />
        <br />
        <input type='submit' value='submit' />
      </form>
    </div>
  )
}

export default PostForm
