module.exports = {
  "moduleName":"auth",
  execute(client, socket)
  {
    //Kullanıcı veri tabanını tamınlar
    // var db = new client.sqlite.Database("./database/logedUsers.sqlite",(e) => {if(e){console.log(e)}})
    socket.on("auth", datas => {
        // // // // // // // // // // // // // // // // // // // // // // 
        if(client.fs.existsSync(`./page/users/${datas.user}/`))
        {
          console.log("mkdir skipped")
        }
        else
        {
          client.fs.mkdirSync(`./page/users/${datas.user}/`)
        } 
        client.fs.writeFileSync(`./page/users/${datas.user}/index.html`,
                client.fs.readFileSync("./page/example.txt","utf-8").toString()
            )
        if(datas.user == "") 
        {
          console.log("kullanıcı adı boş olamaz")
        }
        else
        {
          //Veri tabanından çekilen bilgi forma iletilir
          client.db.all("SELECT * FROM userİnfo", (err, rows) => {
            datas = rows
            socket.emit("auth", datas)
          })
        }
      })
  }
}