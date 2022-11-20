module.exports = {
  "moduleName":"onWriting",
  execute(socket, io, db){
      //Mesajların döndürüldüğü kısım
      socket.on('writing', (datas) => {
          io.emit('writing', datas);
        })
    }
}