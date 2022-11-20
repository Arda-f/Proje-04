module.exports = {
  "moduleName":"onChat",
  execute(socket, io, db){
    //Mesajların döndürüldüğü kısım
    socket.on('chat', (datas) => {
        io.emit('chat', datas);
        //Mesajları veritabanına aktarır
        var liteRun = `INSERT INTO history(users, message) VALUES('${datas.sender}','${datas.message}')`
        //Mesaj boşsa hata vermesi için script
        if(datas.message == ""){console.log("mesaj boş olamaz")}
        else{
        //Scripti sqlite üzerinde çalıştırır
        db.run(liteRun, (e) => {
          if(e){console.log(e)}
          else{console.log("Data Changed")}
        })}
      })
  } 
}