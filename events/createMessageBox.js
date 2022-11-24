module.exports = {
    "moduleName":"createMessageBox",
    execute(client, socket){
        socket.on("createMessageBox", datas => {
            socket.emit("createMessageBox", datas)
        })
    }
}