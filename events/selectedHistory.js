module.exports = {
  "moduleName":"onHistory",
  execute(client, socket){
    //Mesaj geçmişi için oluşturulan event
    socket.on('selectedHistory', (datas) => {
      // console.log(datas)
      client.db.all(`SELECT * FROM ${datas.sender}sMessageBoxs `, (err, rows) => {
          rows.forEach(row => {
            if(row.name == datas.selfName)
            {
              // console.log(datas.selfName)
              var liteRun = `CREATE TABLE IF NOT EXISTS ${datas.selfName}(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,message TEXT,sender TEXT)`
              client.db.run(liteRun)
            }
          });
        })
    })
  }  
}