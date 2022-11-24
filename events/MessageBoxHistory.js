module.exports = {
    "moduleName":"MessageBoxHistory",
    execute(client, socket){
        socket.on("MessageBoxHistory", datas => {
            client.io.emit("MessageBoxHistory", datas)
        })
    }
}