import express from 'express'
import { createServer } from 'http'
import { resolve } from 'path'
import { Server } from 'socket.io'

const DEFAULT_PORT = 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(resolve('./public')))

app.get('/', (req,res) => {
    res.sendFile('/public/index.html')
})

//Socket connection
io.on('connection', socket => {
    socket.on('chat message', (message) => {
        io.emit('chat message', message)
    })
})

server.listen(DEFAULT_PORT, () => console.log(`Server is running on PORT ${DEFAULT_PORT}`))
