import config from "./config.json" assert {type: 'json'}
import eventNames from "./eventNames.json" assert {type: 'json'}
const client = {
    socket: io.connect(config.host),
    addBox: document.getElementById("addBox"),
    MessageBoxArea: document.getElementById("MessageBoxs"),
    messageİnput: document.getElementById("data"),
    messageArea: document.getElementById("msgArea"),
    messageButton: document.getElementById("btn"),
    bar: document.getElementById("bar"),
    logout: document.getElementById("out"),
    join: document.getElementById("joinBox")
}
client.messageArea.innerText = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

document.addEventListener("DOMContentLoaded", () => {
    if(JSON.parse(localStorage.getItem("user-info")) == null)
    {
        document.location.href = config.host
    }
    eventNames.chatFile.forEach(file => {
        const module = import("./chatEventListeners/" + file)
        module.then(value => value.default(client))
    })
    if(document.location.pathname != "/users/federaliste/index.html")
    {
        client.socket.emit("boxChatHistory",{
            user: JSON.parse(localStorage.getItem("user-info")).user,
            pageName: localStorage.getItem("pageName")
        })

        client.socket.on("boxChatHistory", data => {
            data.forEach(value => {
                if(JSON.parse(localStorage.getItem("user-info")).user == value.user){
                    client.messageArea.innerHTML += 
                    `<div style='witdh:100%; '>
                        <div class='right' id='msg'>
                            ${value.message}
                        </div>
                    </div>`
                }
                //Mesajı alan taraftın gördüğü
                else{
                    client.messageArea.innerHTML +=   
                    `<div style='witdh:100%;'>
                        <div class='left' id='msg'>
                            ${value.message}
                        </div>
                    </div>`
                }
                //Her yeni mesaj geldiğinde sayfa aşağıya inmeli
                client.messageArea.scrollTo({top:9999999999999999999})
            })
        }) 
    }
    else
    {
        client.bar.remove()
        localStorage.setItem("pageName","index")
    }
})

