function getRooms(socket) {
  // https://github.com/socketio/socket.io/issues/2890
  return Object.keys(socket.rooms).filter(room => room !== socket.id)
}

module.exports = { getRooms }
