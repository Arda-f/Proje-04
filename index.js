//=====================//Gereklilikler//=====================//
const client = {
  socket:require("socket.io"),
  fs:require("fs"),
  express: require("express"),
  sqlite: require("sqlite3"),
  md5: require("md5"),
  config: require("./page/Js/config.json"),
  DBSOURCE: "database/db.sqlite",
  DBUSERS: "database/db.sqlite",
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
//=====================//Event Handler//=====================//
const eventFiles = client.fs.readdirSync("./events", "utf-8").filter(file => file.endsWith(".js"))
const events = []
eventFiles.forEach(file => {
    const event = require(`./events/${file}`)
    events.push(event)
})
//=====================//Bağlantı Sağlandığında Yapılacaklar//=====================//
client.io.on('connection', (socket) => {
  console.log("//===========//Bağlantı Sağlandı//===========//")
//=====================//Tüm Eventleri Çağıran Kısım//=====================//
  for (i = 0; i < events.length; i++){
    events[i].execute(client, socket)
  }
})


