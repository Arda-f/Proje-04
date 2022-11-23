function execute(client) {
    client.socket.on("auth", datas => {
        window.location.href = "http://localhost:3000/chat.html"
    })
}

export default execute