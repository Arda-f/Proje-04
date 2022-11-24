function execute(client) {
    client.socket.on("MessageBoxHistory", (datas) => {
        console.log(client.selfName)
        for (let i = 0; i < client.selfNames.length; i++) {
            const selfName = client.selfNames[i];
            const selfSpan = client.selfSpan[i];
            selfSpan.addEventListener("keypress", (e) => {
                if(e.key == "Enter" && selfSpan.value != "" && selfName.value != "")
                {
                    const span = document.createElement("span").innerText = selfSpan.value
                    const div = document.createElement("div").innerText = selfName.value
                    selfSpan.replaceWith(span)
                    selfName.replaceWith(div)
                }
            })
        }
    })
}

export default execute