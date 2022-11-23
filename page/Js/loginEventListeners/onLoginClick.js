function execute(client){
    client.login.addEventListener("click", () => {
        client.socket.emit("auth", {
            user:client.username.value,
             pass:client.pass.value
        })
    })
}

export default execute
