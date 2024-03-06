import express from 'express'
import databaseService from '~/services/database.services'
const app = express()
import usersRouter from '~/routes/users.routes'
const port = 3000
app.use(express.json())
app.use('/user', usersRouter)
databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
