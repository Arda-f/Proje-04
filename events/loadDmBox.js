module.exports = {
    execute(client, socket){
        socket.on("loadDmBox", data => {
            client.db.all(`SELECT * FROM ${data.user}_DmBoxList`, (err, rows) => {
                socket.emit("loadDmBox", rows)           
            })
        })
    }
}