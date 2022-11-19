const socket = require("socket.io")
const express = require("express")
const sqlite = require("sqlite3").verbose()
const  md = require("md5")
const md5 = require("md5")
const app = express()
const onChat = require("./events/onChat.js")
const onHistory = require("./events/onHistory")
const DBSOURCE = "database/db.sqlite"

const server = app.listen(3000)

app.use(express.static("./page"))

const io = socket(server)

var db = new sqlite.Database(DBSOURCE, (e) =>{if(e){console.log(e)}})      

io.on('connection', (socket) => {
    onChat(socket, io, db)
    onHistory(socket, io, db, sqlite, DBSOURCE)
    
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
