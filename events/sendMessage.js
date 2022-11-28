module.exports = {
    execute(client, socket){
        socket.on("sendMessage", data =>{ 
            socket.emit("sendMessage",data)
            const script1 = `INSERT INTO ${data.pageName}_${data.user}_DmBox(message, user) VALUES(
            '${data.message}',
            '${data.user}'
            )`
            if(data.message == ""){console.log("mesaj boş olamaz")}
            else
            {
                client.db.run(script1)
            }
                
        })
    }
}