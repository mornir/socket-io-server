const socketIO = require('socket.io')
const io = socketIO.listen(process.env.PORT || 3000)

io.on('connection', socket => {
  console.log('user connected')

  socket.on('join', room => {
    socket.join(room)

    socket.emit('welcome', 'welcome man')
    socket.broadcast.to(room).emit('welcome', 'new user')
  })

  socket.on('player1Answer', answer => {
    console.log('got answer', answer)
    socket.broadcast.emit('player1AnswerReceived', answer)
  })

  // used in games 2 & 3
  socket.on('rateAnswer', rating => {
    console.log('got rating', rating)
    io.to(rating.room).emit('ratedAnswer', rating)
  })

  // used in game 2
  socket.on('selectCard', payload => {
    console.log('got payload', payload)
    io.to(payload.room).emit('selectedCard', payload)
  })

  socket.on('switchRole', room => {
    console.log('switchRole')
    socket.emit('switchedRole')
  })
})
