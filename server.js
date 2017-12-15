const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

let connections = 0

app.use(express.static(__dirname+'/static'))

io.on('connection',socket =>{
	io.emit('update',++connections)
	socket.on('disconnect',()=>{
		io.emit('update',--connections)
	})
})

http.listen(PORT,()=>{
	console.log(`listening on *:${PORT}`)
})
