const express = require('express')

const { createPost, updatePost } = require('../queries/post')

const postController = express.Router()

postController.post('/newpost', async (req, res) => {
  const addPost = await createPost(req.body)

  if (addPost) {
    res.status(200).json({ success: true, payload: addPost })
  } else {
    res.status(404).send({ success: false, payload: 'no post error' })
  }
})


postController.put('/updatepost', async (req, res) => {
    const changePost = await updatePost(req.body)

    if (changePost) {
        res.status(200).json({success:true, payload:changePost})
    } else {
        res.status(404).json({success:false, payload:'update post error'})
    }

})

module.exports= postController