module.exports = {
  "moduleName":"auth",
  execute(client, socket){
  //Kullanıcı veri tabanını tamınlar
  var db = new client.sqlite.Database("./database/logedUsers.sqlite",(e) => {if(e){console.log(e)}})
  socket.on("auth", datas => {
      // // // // // // // // // // // // // // // // // // // // // //             
      if(datas.user == "") {console.log("kullanıcı adı boş olamaz")}
      else{
        //Veri tabanından çekilen bilgi forma iletilir
        db.all("SELECT * FROM userData", (err, rows) => {
          datas = rows
          socket.emit("auth", datas)
        })
      }
    })
  }
}