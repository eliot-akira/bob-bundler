import path from 'path'
import express from 'express'

const app = express()
const client = path.join(process.cwd(), 'build', 'client')
const port = process.env.PORT || 3000

app.use(express.static(client))

app.listen(port, () =>
  console.log(`Serving from port ${port}`)
)
