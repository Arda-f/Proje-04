//=====================//Gereklilikler//=====================//
import config from "./config.json" assert {type: 'json'}
import eventNames from "./eventNames.json" assert {type: 'json'}
const client = {
    socket: io.connect(config.host),
    login: document.getElementById("login"),
    remember: document.getElementById("rem"),
    username: document.getElementById("username"),
    pass: document.getElementById("password")
}
//=====================//Event Handler//=====================//
for(const file of eventNames.loginFile){
    client.modules = import("./loginEventListeners/" + file)
    client.modules.then(value => value.default(client))
}
//Sayfa yüklendiğinde giriş yapılmışsa otomatik olarak giriş yapmasını sağlar
document.addEventListener("DOMContentLoaded", (e) =>{
    const item = JSON.parse(localStorage.getItem("user-info"))
    if(item){
        client.socket.emit("auth", {user:item.user, pass:item.pass}) 
    }
})

