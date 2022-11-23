function execute(client) {
    client.btn.addEventListener("click", () => {
        client.socket.emit("chat", {
            message:client.dt.value, 
            sender:client.item.user
        })
        client.socket.emit("writing", {
            sender: "\n"
        })
        // feedback.innerText = "\n"
    })
}

export default execute
