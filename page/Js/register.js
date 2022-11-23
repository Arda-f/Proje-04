import config from "./config.json" assert {type: 'json'}
import eventNames from "./eventNames.json" assert {type: 'json'}
const client = {
    socket: io.connect(config.host),
    register: document.getElementById("login"),
    remember: document.getElementById("rem"),
    username: document.getElementById("username"),
    pass: document.getElementById("password"),
    pass2: document.getElementById("password2"),
    email: document.getElementById("email")
}
//=====================//Event Handler//=====================//
for(const file of eventNames.registerFile){
    client.modules = import("./registerEventListeners/" + file)
    client.modules.then(value => value.default(client))
}
document.addEventListener("DOMContentLoaded", () => {
    const item = JSON.parse(localStorage.getItem(("user-info")))
    if(item)
    {
        client.socket.emit("auth", {user:item[0], pass:item[1], token:item[2]})    
    }
})