const express = require('express')
const app = express()
const myhttp = require('http').createServer(app)
const PORT = process.env.PORT || 3000
myhttp.listen(PORT,function ()
{
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html')
})
const myio = require('socket.io')(myhttp)
myio.on('connection', function(socket){
 console.log('it is conncected')
 socket.on('message', (message) => {
socket.broadcast.emit('message', message)
    })})
