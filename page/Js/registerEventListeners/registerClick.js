function execute(client) {
    client.register.addEventListener("click", () => {
        if(client.pass.value == client.pass2.value)
        {
        client.socket.emit("addUser",{
            user:client.username.value,
            email:client.email.value,
            pass:client.pass.value, token:""
            })
        }
    })
}

export default execute