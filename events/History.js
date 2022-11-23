module.exports = {
  "moduleName":"onHistory",
  execute(client, socket){
    //Mesaj geçmişi için oluşturulan event
    socket.on('history', (datas) => {
        //Geçmiş Mesajları Okumak için veri tabanına bağlanır
      new client.sqlite.Database(client.DBSOURCE, (e) =>{
        if(e){console.log(e)}
        //Veri tabanından satırları çeker
        client.db.all(`SELECT * FROM history;`, (err, results) => {
          datas = results
          client.io.emit('history', results)
        })
      })
    })
  }  
}