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
    MessageBoxs: document.getElementById("MessageBoxs"),
    addBox: document.getElementById("addBox"),
    item: JSON.parse(localStorage.getItem("user-info")),
    selfNames: document.getElementsByClassName("selfName")
    // selfNames: document.querySelectorAll("input[class='selfName']")
}
//=====================//Event Handler//=====================//
for(const file of eventNames.chatFile)
{
    client.modules = import("./chatEventListeners/" + file)
    client.modules.then(value => value.default(client))
}

//Başlangıçta mesaj aşağıda olmalı
client.msgs.innerText = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
//=====================//İçerik Yüklendiğinde//=====================//
document.addEventListener("DOMContentLoaded", () => {
        client.socket.emit("history", {message: "", users: ""})
        client.socket.emit("MessageBoxHistory", {name: "test", comment: "test"})
        if(client.item.user != "")
        {
            client.socket.emit("auth", {user:client.item.user, pass:client.item.pass}) 
        }
        const a = document.createElement("a")
                a.href = "#"
                a.innerHTML = 
                    `<div class="MessageBox">
                        <img src="resim1.jpg" alt="">
                        <div id="contents">
                            <div><input class="selfName" require placeholder='MessageBox Name'></div>
                            <div><input class="selfSpan" require placeholder='MessageBox Comment'></div>
                        </div>
                    </div>`
                 client.MessageBoxs.appendChild(a)
    })
//===================================================================//
// selfNames.forEach(selfName => {
//     selfName.addEventListener("click", (e) => {
//         console.log(selfName)
//         // if(e.key == "Enter")
//         // {
//         //     const div = document.createElement("div").innerText = "client.selfNames.value"
//         //     selfName.replaceWith(div)
//         // // }
//     })
// })