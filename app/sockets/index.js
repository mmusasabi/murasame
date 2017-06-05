let Log = require('../models/log.model')

module.exports = SocketIo

function SocketIo(server) {
  let io = require('socket.io')(server);
  let users = []
  io.on('connection', (socket) => {
    console.log('connection')

    /**
     * サービス切り替え
     */
    socket.on('switch_service', (params) => {
      // すでにMongoDBのストリームを開いていたら削除する。じゃないと多重で受け取ることになる
      if (users[socket.id]) {
        users[socket.id].destroy()
      }

      let stream = Log.find({ service_id: params.service_id }).tailable().stream()
      users[socket.id] = stream
      stream.on('data', (data) => {
        io.to(socket.id).emit('log_tail', {
          log: data
        })
      })
    })

    /**
     * ホスト名でフィルタ
     */
    socket.on('filter_host', (params) => {
      // すでにMongoDBのストリームを開いていたら削除する。じゃないと多重で受け取ることになる
      if (users[socket.id]) {
        users[socket.id].destroy()
      }

      let stream = Log.find({ service_id: params.service_id, host: params.hostname }).tailable().stream()
      users[socket.id] = stream
      stream.on('data', (data) => {
        io.to(socket.id).emit('log_tail', {
          log: data
        })
      })
    })

    socket.on('disconnect', () => {
      if (users[socket.id]) {
        users[socket.id].destroy()
      }
    })
  })
}