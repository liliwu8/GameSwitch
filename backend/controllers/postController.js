const express = require('express')

const { createPost, updatePost ,deletePost} = require('../queries/post')

const postController = express.Router()

postController.post('/newpost', async (req, res) => {
  const addPost = await createPost(req.body)

  if (addPost) {
    res.status(200).json({ success: true, payload: addPost })
  } else {
    res.status(404).send({ success: false, payload: 'no post error' })
  }
})


postController.put('/updatepost/:threadid', async (req, res) => {
  const { threadid } = req.params
  console.log(threadid)
    const changePost = await updatePost(threadid,req.body)
    
    if (changePost) {
        res.status(200).json({success:true, payload:changePost})
    } else {
        res.status(404).json({success:false, payload:'update post error'})
    }

})

postController.delete('/deletepost/:postid', async (req, res) => {
  const { postid} = req.params
  
  const deleteOnePost = await deletePost(postid)

  if (deleteOnePost) {
    res.status(200).json({sucess:true, payload:deleteOnePost})
  } else {
    res.status(404).json({ error: 'server error' })
  }
})


module.exports= postController