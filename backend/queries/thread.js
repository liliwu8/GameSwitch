//import the db object
const db = require('../db/dbConfig.js')

// const getAllThreads = async () => {
//   try {
    
//     const allThreads = await db.any(
//       'SELECT t.thread_id, t.thread_title,t.thread_body, t.thread_created, u.user_name, u.user_avatar FROM thread t JOIN users u ON t.thread_user_id = u.user_id '
//     )
//     return allThreads
//   } catch (error) {
//     console.log(error.message)
//   }
// }

const getAllThreads = async () => {
  try {
    const allThreads = await db.any(`
      SELECT 
        t.thread_id, 
        t.thread_title,
        t.thread_body, 
        t.thread_created, 
        u.user_name, 
        u.user_avatar,
        COUNT(p.post_id) + 1 AS post_count
      FROM thread t
      JOIN users u ON t.thread_user_id = u.user_id
      LEFT JOIN post p ON t.thread_id = p.post_thread_id
      GROUP BY t.thread_id, u.user_name, u.user_avatar
    `);
    return allThreads;
  } catch (error) {
    console.log(error.message);
  }
};


const getThread = async (id) => {
  try {
    const firstPost = await db.any(
      'SELECT t.thread_id, 0 as post_id, t.thread_title, t.thread_created as post_created, t.thread_body as post_content,  u.user_name, u.user_avatar FROM thread t JOIN users u ON t.thread_user_id = u.user_id WHERE t.thread_id = $1',
      id
    )
    const thread = await db.any(
      'SELECT  u.user_name, u.user_avatar,p.post_id, p.post_content, p.post_created, p.post_user_id FROM post p JOIN thread t ON p.post_thread_id = t.thread_id JOIN users u ON post_user_id = u.user_id WHERE p.post_thread_id = $1',
      id
    )
    return [...firstPost, ...thread]
  } catch (error) {
    console.log(error.message || error)
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
    console.log(error.message || error)
  }
}

module.exports = {
  getAllThreads,
  getThread,
  createThread,
  deleteThread,
  updatingThread,
}
