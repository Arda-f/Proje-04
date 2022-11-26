//=====================//Gereklilikler//=====================//
const client = {
  socket:require("socket.io"),
  fs:require("fs"),
  express: require("express"),
  sqlite: require("sqlite3"),
  md5: require("md5"),
  config: require("./page/Js/config.json"),
  DBSOURCE: "database/main.sqlite",
  debug:"Dökümandan içerik çekilir"
}

//=====================//Sayfa Eventleri Yüklenir//=====================//
const chatFile = client.fs.readdirSync("./page/Js/chatEventListeners")
const loginFile = client.fs.readdirSync("./page/Js/loginEventListeners")
const registerFile = client.fs.readdirSync("./page/Js/registerEventListeners")
client.fs.writeFileSync("./page/Js/eventNames.json", JSON.stringify({chatFile, loginFile, registerFile},null,1),"utf-8")
//=====================//Bağlantılar Başlatılır//=====================//
client.app = client.express()
const server = client.app.listen(3000)
client.app.use(client.express.static("./page"))
client.io = client.socket(server)
client.db = new client.sqlite.Database(client.DBSOURCE, (e) =>{if(e){console.log(e)}})       

//=====================//Bağlantı Sağlandığında Yapılacaklar//=====================//
client.io.on('connection', (socket) => {
  //=====================//Event Handler//=====================//
  client.fs.readdirSync("./events", "utf-8").filter(file => file.endsWith(".js")).forEach(file => {
        require(`./events/${file}`).execute(client, socket)
  })
  console.log("//===========//Bağlantı Sağlandı//===========//")
})


