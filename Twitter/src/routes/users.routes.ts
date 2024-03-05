import express from 'express'
const router = express.Router()
router.use((req, res, next) => {
  console.log('Time', Date.now())
  next()
})
router.get('/tweets', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        text: 'Hello'
      }
    ]
  })
})
export default router
