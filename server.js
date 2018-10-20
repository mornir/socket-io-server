const socketIO = require('socket.io')
const io = socketIO.listen(process.env.PORT || 3000)

const { getRooms } = require('./utils')

io.on('connection', socket => {
  socket.on('join', ({ token, room }, callback) => {
    if (token != 8888) {
      return callback('Invalid token')
    }

    socket.join(room)

    io.in(room).clients((error, clients) => {
      //TODO: review this line before production
      if (error) throw error

      // if room already contains one user, it means that an other user (student or tutor) is already connected
      if (clients.length > 1) {
        io.to(room).emit('other_connected')
      }
    })

    socket.emit('welcome', `welcome in room: ${room}`)
    socket.broadcast.to(room).emit('welcome', `welcome ${socket.id}`)

    callback()
  })

  socket.on('disconnecting', reason => {
    console.log({ reason })

    const rooms = Object.keys(socket.rooms)
    console.log('room list', rooms)

    rooms.forEach(room => {
      io.to(room).emit('other_disconnected', { id: socket.id })
    })
  })

  socket.on('inviteStudent', params => {
    console.log('inviteStudent', params)

    getRooms(socket).forEach(room => {
      socket.to(room).emit('inviteStudent', params)
    })
  })

  socket.on('studentHasArrived', () => {
    console.log('studentHasArrived')
    getRooms(socket).forEach(room => {
      socket.to(room).emit('studentHasArrived')
    })
  })

  socket.on('studentIsReady', () => {
    console.log('studentIsReady')
    getRooms(socket).forEach(room => {
      io.to(room).emit('studentIsReady')
    })
  })

  socket.on('startGame', () => {
    console.log('startGame')
    getRooms(socket).forEach(room => {
      io.to(room).emit('startGame')
    })
  })

  require('./games/GameTwo')(io, socket)
  require('./games/GameOne')(io, socket)

  // used in chat component
  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg)
    getRooms(socket).forEach(room => {
      io.to(room).emit('new_message', {
        createAt: new Date().getTime(),
        ...msg,
      })
    })

    callback()
  })

  // Game 3
  socket.on('player1Answer', answer => {
    console.log('got answer', answer)
    socket.broadcast.emit('player1AnswerReceived', answer)
  })

  socket.on('disconnect', () => {})
})
