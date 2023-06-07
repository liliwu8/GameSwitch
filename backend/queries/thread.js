//import the db object
const db = require('../db/dbConfig.js')

const getAllThreads = async () => {
  try {
    const allThreads = await db.any('SELECT * from thread')
    return allThreads
  } catch (error) {
    console.log(error.message)
  }
}

const getThread = async (id) => {
  try {
    const thread = await db.any('select thread.thread_body, thread.thread_title,thread.thread_created, thread.thread_id,thread.thread_user_id,post.post_user_id, post.post_created,post.post_content, post.post_id from thread join post on thread.thread_id = post.post_thread_id where thread.thread_id = $1', id)
    return thread
  
  } catch (error) {
    console.log(error.message||error)
  }
}

const createThread = async (thread) => {
  const { thread_title, thread_body, thread_user_id } = thread

  try {
    const addThread = await db.one(
      'insert into thread (thread_title, thread_body,thread_user_id) values($1,$2,$3) returning *',
      [thread_title, thread_body, thread_user_id]
    )

    return addThread
  } catch (error) {
    console.log(error.message || error)
  }
}
const updatingThread = async (thread) => {
  const { thread_body, thread_id, thread_title } = thread
  try {
    const updateThread = await db.one(
      'update thread set thread_title=$1,thread_body=$2 where thread_id=$3 returning *',
      [thread_title, thread_body, thread_id]
    )

    return updateThread
  } catch (error) {
    console.log(error.message || error)
  }
}

const deleteThread = async (thread_id) => {
  try {
    const deleteThread = await db.one(
      'delete from thread where thread_id=$1 returning *',
      thread_id
    )
    return deleteThread
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getAllThreads,
  getThread,
  createThread,
  deleteThread,
  updatingThread,
}
