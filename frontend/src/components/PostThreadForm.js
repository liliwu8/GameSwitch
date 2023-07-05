import { useEffect, useState } from 'react'
import './PostThread.scss'

function PostForm(props) {
const [post,setPost]= useState([])
  const{threadDetails} = props
 

  const handleTextChange = (event) => {
    setPost({ ...post, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    
    if (threadDetails) {
      setPost(threadDetails);
    }
  }, [threadDetails,props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(post);
    if (threadDetails) {
      props.toggleView();
    }
    setPost({
     post_content: "",
    });
  };

  return (
    <div>
       {props.children}
      <form onSubmit={handleSubmit}>
        <textarea className='text'
          id='post_content'
          value={post.post_content}
          onChange={handleTextChange}
          placeholder='Enter your post...'
        />
        <br />
       <button type='submit' className='text__submitbutton'>Submit</button>
      </form>
    </div>
  )
}


export default PostForm
