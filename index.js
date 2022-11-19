const socket = require("socket.io")
const express = require("express")
const sqlite = require("sqlite3").verbose()
const md5 = require("md5")
const app = express()
const onChat = require("./events/onChat.js")
const onHistory = require("./events/onHistory")
const fs = require("fs")

const DBSOURCE = "database/db.sqlite"

const server = app.listen(3000)

app.use(express.static("./page"))

const io = socket(server)

var db = new sqlite.Database(DBSOURCE, (e) =>{if(e){console.log(e)}})      

//Event handler

//Js dosyalarını çeker
const eventFiles = fs.readdirSync("./events", "utf-8").filter(file => file.endsWith(".js"))
//Js dosyalarının duracağı boş diziyi oluşturur
const events = []
//Dosyaları tek tek alır
eventFiles.forEach(file => {
    //kütüphane şeklinde dahil eder
    const event = require(`./events/${file}`)
    //Oluşturulan boş diziye ekler
    events.push(event)
})

io.on('connection', (socket) => {
  
  //Js dosyalarını tek tek çalıştırmak için döngü
  for (i = 0; i < events.length; i++){
    //Fonksiyonun çağırıldığı kısım
    events[i].execute(socket, io, db, sqlite, DBSOURCE)
  }

})


      
      
  
      
  // <!-- <script>
  //       var btn = document.getElementById("btn")
  //       var data = document.getElementById("data")
  //       var msgArea = document.getElementById("msgArea")
  //       var feedback = document.getElementById("feedback")

        

  //       btn.addEventListener("click",() => {newMsg()})
  //       data.addEventListener("input", () => {
  //           if(data.value == ""){
  //               feedback.innerText = ""
  //           }
  //           else{
  //               feedback.innerText = "yazıyor..."
  //           }
  //       })


  //       function newMsg() {
  //           var newP = document.createElement("span")
  //           newP.innerText = data.value + "\n"
  //           if(data.value == "") {}
  //           else{
  //               msgArea.appendChild(newP)
  //               data.value = ""
  //               feedback.innerText = ""
  //           }
            
  //       }
  //   </script> -->
