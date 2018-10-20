const { getRooms } = require('../utils')

module.exports = function(io, socket) {
  socket.on('selectCard', selectedCard => {
    console.log('🃏 Selected card is: ', selectedCard)
    getRooms(socket).forEach(room => {
      io.to(room).emit('selectedCard', selectedCard)
    })
  })

  socket.on('rateGuessedCard', rating => {
    console.log('✔❌ rateGuessedCard', rating)
    getRooms(socket).forEach(room => {
      io.to(room).emit('ratedGuessedCard', rating)
    })
  })

  socket.on('revealJapanese', payload => {
    getRooms(socket).forEach(room => {
      io.to(room).emit('revealedJapanese', payload)
    })
  })
}
