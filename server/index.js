
import express from 'express'
import cors from 'cors'

const app = express()
const port = 8000

app.use(cors())

app.get('/api', (req, res) => {
  res.send({ data: 'Hello from the server!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})