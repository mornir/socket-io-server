const { getRooms } = require('../utils')

module.exports = function(io, socket) {
  socket.on('addBulle', bulle => {
    getRooms(socket).forEach(room => {
      io.to(room).emit('addedBulle', bulle)
    })
  })

  socket.on('removeBulle', () => {
    console.log('removedBulle')

    getRooms(socket).forEach(room => {
      io.to(room).emit('removedBulle')
    })
  })

  socket.on('revealTranscript', () => {
    console.log('revealTranscript')

    getRooms(socket).forEach(room => {
      io.to(room).emit('revealedTranscript')
    })
  })

  socket.on('revealTranslation', () => {
    console.log('revealTranslation')

    getRooms(socket).forEach(room => {
      io.to(room).emit('revealedTranslation')
    })
  })

  socket.on('invertRole', () => {
    console.log('invertRole')

    getRooms(socket).forEach(room => {
      io.to(room).emit('invertedRole')
    })
  })

  socket.on('startFromBeginning', () => {
    console.log('startFromBeginning')

    getRooms(socket).forEach(room => {
      io.to(room).emit('startedFromBeginning')
    })
  })

  socket.on('goToScene', sceneId => {
    console.log('goneToScene', sceneId)

    getRooms(socket).forEach(room => {
      io.to(room).emit('goneToScene', sceneId)
    })
  })

  socket.on('replaceWord', selectedWord => {
    console.log('replaceWord', selectedWord)

    getRooms(socket).forEach(room => {
      io.to(room).emit('replacedWord', selectedWord)
    })
  })
}
