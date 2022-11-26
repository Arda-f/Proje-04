module.exports = {
    "moduleName":"MessageBoxHistory",
    execute(client, socket){
        socket.on("MessageBoxHistory", datas => {
            client.db.all(`SELECT * FROM ${datas.sender}sMessageBoxs`, (err, results) => {
                client.io.emit("MessageBoxHistory", results)
            }) 
        })
    }
}