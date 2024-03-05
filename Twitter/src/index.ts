import express from 'express'
const app = express()
import usersRouter from '~/routes/users.routes'
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use('/user', usersRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
