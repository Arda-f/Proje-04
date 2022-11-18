const socket = require("socket.io")
const express = require("express")
const sql = require("mysql")
const con = sql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "04516428",
  database: "socketio"
})
con.connect(() => {
  console.log("Mysql Connected")
});

const app = express()

const server = app.listen(3000)

app.use(express.static("./page"))

const io = socket(server)

var sqlQuery = `INSERT INTO chathistory(users, message) VALUES ?`
var sqlQuery2 = `SELECT * FROM chathistory;`

io.on('connection', (socket) => {
    //Mesajların döndürüldüğü kısım
    socket.on('chat', (datas) => {
      io.emit('chat', datas);
      //Mesajları veri tabanına kaydedilmesi için script
      var values = [
        [datas.sender, datas.message]
      ]
      //Mesaj boşsa hata vermesi için script
      if(datas.message == ""){console.log("mesaj boş olamaz")}
      else{
        con.query(sqlQuery, [values]);       
        console.log("Data Changed")
      }

    });
    console.log(socket)
    socket.on('history', (datas) => {
        con.query(sqlQuery2, (err, results, fields) => {
          datas = results
          io.emit('history', datas);
        });
        
      });
  });

      
      

      
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
