import express from 'express'
import cors from 'cors'
import { mainRoutes } from './routes/main'

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(mainRoutes)

server.listen(process.env.PORT, () => {
   console.log(`Server running on port ${process.env.PORT}`)
})