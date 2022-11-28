module.exports = {
    execute(client, socket){
        socket.on("boxChatHistory", data => {
            const script1 = `SELECT * FROM ${data.pageName}_${data.user}_DmBox`
            client.db.all(script1, (err, rows) => {
                socket.emit("boxChatHistory", rows)
            })
        })
       
    }
}