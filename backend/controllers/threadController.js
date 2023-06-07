const express = require('express')

const {
  getAllThreads,
  getThread,
  createThread,
  deleteThread,
  updatingThread,
} = require('../queries/thread')

const threadController = express.Router()

threadController.get('/', async (req, res) => {
  try {
    const threads = await getAllThreads()
    console.log(threads)
    res.status(200).json({ success: true, payload: threads })
  } catch (error) {
    res.status(400).json({ success: false, message: 'no thread found!' })
  }
})

threadController.get('/:thread_id', async (req, res) => {
  const { thread_id } = req.params
  const thread = await getThread(thread_id)
  if (thread) {
    res.status(200).json({ success: true, payload: thread })
  } else {
    res.status(404).json({ success: false, payload: 'no thread found' })
  }
})

threadController.post('/newthread', async (req, res) => {
  const addThread = await createThread(req.body)

  if (addThread) {
    res.status(200).json({ success: true, payload: addThread })
  } else {
    res.status(404).send({ success: false, payload: 'create error' })
  }
})

threadController.put('/updateThread', async (req, res) => {
  const changeThread = await updatingThread(req.body)

  if (changeThread) {
    res.status(200).json({ success: true, payload: changeThread })
  } else {
    res.status(400).json({ success: false, payload: 'update error ' })
  }
})

module.exports = threadController
