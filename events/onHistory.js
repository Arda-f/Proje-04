module.exports = (socket, io, db, sqlite, DBSOURCE) => {
    //Mesaj geçmişi için oluşturulan event
    socket.on('history', (datas) => {
        //Geçmiş Mesajları Okumak için veri tabanına bağlanır
      new sqlite.Database(DBSOURCE, (e) =>{
        if(e){console.log(e)}
        else{console.log("database connected")}
        //Veri tabanından satırları çeker
        db.all(`SELECT * FROM history;`, (err, results) => {
          datas = results
          io.emit('history', results)
        })
      })
    })
}