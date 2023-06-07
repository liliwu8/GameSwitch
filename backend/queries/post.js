const db = require("../db/dbConfig.js");

const createPost = async (post) => {
    const { post_content, post_user_id } = post
     
    try {
        const addPost = await db.one('insert into post (post_content,post_user_id) values($1,$2)', [post_content, post_user_id])
        return addPost
    } catch (error) {
        console.log(error.message||error)
    }
}

const updatePost = async (post) => {
    const { post_content, post_id} = post
    try {
        const updatingPost = await db.one('update post set post_content=$1, post_id=$2 where id=3', [post_id, post_content])
        return updatingPost
    } catch(error) {
        console.log(error.message|| error)
    }
}

module.exports = {
    updatePost,
    createPost
}