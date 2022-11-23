//=====================//Gereklilikler//=====================//
import config from "./config.json" assert {type: 'json'}
import eventNames from "./eventNames.json" assert {type: 'json'}
const client = {
    socket: io.connect(config.host),
    msgs: document.getElementById("msgArea") ,
    dt: document.getElementById("data"),
    btn: document.getElementById("btn"),
    btn2: document.getElementById("btn2"),
    out: document.getElementById("out"),
    item: JSON.parse(localStorage.getItem("user-info"))
}
//=====================//Event Handler//=====================//
for(const file of eventNames.chatFile){
    client.modules = import("./chatEventListeners/" + file)
    client.modules.then(value => value.default(client))
}

//Başlangıçta mesaj aşağıda olmalı
msgs.innerText = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
//=====================//İçerik Yüklendiğinde//=====================//
document.addEventListener("DOMContentLoaded", () => {
        socket.emit("history", {message: "", users: ""})
        if(item.user != ""){
            socket.emit("auth", {user:item.user, pass:item.pass}) 
        }
    })

//===================================================================//