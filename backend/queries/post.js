const db = require('../db/dbConfig.js')
const { getThread } = require('../queries/thread')
const createPost = async (post) => {
  const { post_content, post_user_id, post_thread_id } = post

  try {
    const addPost = await db.one(
      'insert into post (post_content,post_user_id,post_thread_id ) values($1,$2,$3) returning *',
      [post_content, post_user_id, post_thread_id]
    )
    return getThread(post_thread_id)
  } catch (error) {
    console.log(error.message || error)
  }
}

const updatePost = async (threadid,post) => {
  const { post_content, post_id } = post
  try {
    const updatingPost = await db.one(
      'update post set post_content=$1 where post_id=$2 returning *',
      [post_content, post_id]
    )
   
    return getThread(threadid)
  } catch (error) {
    console.log(error.message || error)
  }
}

const deletePost = async (post_id) => {
  
  try {
    const onePost = await db.one(
      'DELETE FROM post WHERE post_id=$1 RETURNING *',
      post_id
    )
    return onePost
  } catch (error) {
    console.log(error.message || error)
    return error
  }
}
module.exports = {
  updatePost,
  createPost,
  deletePost
}
