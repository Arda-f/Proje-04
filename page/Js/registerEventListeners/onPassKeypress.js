function execute(client) {
    client.pass.addEventListener("keypress", (e) => {
        if(e.key == "Enter")
        {
            if(client.pass.value == client.pass2.value)
            {
                client.socket.emit("addUser", {
                    user:client.username.value,
                    pass:client.pass.value, token:""
                })
            }
        }
    })
}

export default execute