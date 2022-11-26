module.exports = {
    "moduleName":"FirsBoxCreater",
    execute(client, socket){
      socket.on('FirsBoxCreater', first => {
          var liteRun1 = `CREATE TABLE IF NOT EXISTS ${first}sMessageBoxs(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)`
          client.db.run(liteRun1)
      })
    }  
  }