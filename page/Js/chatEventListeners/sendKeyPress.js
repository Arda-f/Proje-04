function execute(client) {
    client.dt.addEventListener("keypress", e => {
        if(e.key == "Enter"){
            client.socket.emit("chat", {
                message:client.dt.value,
                sender:client.item.user
            })
        }
    })
}

export default execute
