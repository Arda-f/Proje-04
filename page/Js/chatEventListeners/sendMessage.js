export default (client) => {
    client.messageİnput.addEventListener("keypress", (e) => {
        if(e.key == "Enter")
        {
            if(client.messageİnput.value.length < 100)
            {
                client.socket.emit("sendMessage",{
                    message: client.messageİnput.value,
                    user: JSON.parse(localStorage.getItem("user-info")).user,
                    pageName: localStorage.getItem("pageName")
                })
                client.messageİnput.value = ""
            }
        }
    })
    client.socket.on("sendMessage", data => {
        if (data.message != "")
        {
            if(JSON.parse(localStorage.getItem("user-info")).user == data.user){
                client.messageArea.innerHTML += 
                `<div style='witdh:100%; '>
                    <div class='right' id='msg'>
                        ${data.message}
                    </div>
                </div>`
            }
            //Mesajı alan taraftın gördüğü
            else{
                client.messageArea.innerHTML +=   
                `<div style='witdh:100%;'>
                    <div class='left' id='msg'>
                        ${data.message}
                    </div>
                </div>`
            }
            //Her yeni mesaj geldiğinde sayfa aşağıya inmeli
            client.messageArea.scrollTo({top:9999999999999999999})
        }
    })
}