export default (client) => {
    client.addBox.addEventListener("click", () => {
        for (let i = 0; i < client.selfName.length; i++)
        {
            client.selfSpan[i].addEventListener("keypress", e => {
                if(e.key == "Enter" && client.selfSpan[i].value != "")
                {
                    client.socket.emit("waitSetName", {
                        boxName: client.selfName[i].value,
                        boxComment: client.selfSpan[i].value,
                        user: JSON.parse(localStorage.getItem("user-info")).user
                    })
                    const selfName = document.createElement("div")
                    const selfSpan = document.createElement("div")
                    selfName.className = "selfName"
                    selfSpan.className = "selfSpan"
                    selfName.innerText = client.selfName[i].value
                    selfSpan.innerText = client.selfSpan[i].value
                    client.selfName[i].replaceWith(selfName)
                    client.selfSpan[i].replaceWith(selfSpan)
                    client.socket.emit("saveDmBox",{
                        name:client.selfName[i].value,
                        comment: client.selfSpan[i].value,
                        user: JSON.parse(localStorage.getItem("user-info")).user
                    })
                    client.socket.on("saveDmBox", data => {
                        document.location.reload()
                    })

                }
            })
        }
    })
}