function execute(client) {
    client.addBox.addEventListener("click", () => {
        client.socket.emit("createMessageBox", {
            name:client.dt.value
        })
    })
}

export default execute