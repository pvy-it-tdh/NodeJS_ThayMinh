import express from 'express'
import databaseService from '~/services/database.services'
const app = express()
import usersRouter from '~/routes/users.routes'
const port = 3000
app.use(express.json())
app.use('/user', usersRouter)
databaseService.connect()
app.use((err, req, res, next) => {
  console.log('Lỗi là ', err.message)
  res.status(404).json({ error: err.message })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
