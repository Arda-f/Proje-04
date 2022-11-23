function execute(client) {
    client.pass.addEventListener("keypress", (e) => {
        if(e.key=="Enter"){
            client.socket.emit("auth", {
                user:".",
                 pass:"."
            })
        }
    })
}

export default execute
