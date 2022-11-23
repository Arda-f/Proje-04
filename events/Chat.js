module.exports = {
  "moduleName":"onChat",
  execute(client, socket){
    //Mesajların döndürüldüğü kısım
    socket.on('chat', (datas) => {
        client.io.emit('chat', datas);
        //Mesajları veritabanına aktarır
        var liteRun = `INSERT INTO history(users, message) VALUES('${datas.sender}','${datas.message}')`
        //Mesaj boşsa hata vermesi için script
        if(datas.message == ""){console.log("mesaj boş olamaz")}
        else{
        //Scripti sqlite üzerinde çalıştırır
        client.db.run(liteRun, (e) => {
          if(e){console.log(e)}
        })}
      })
  } 
}