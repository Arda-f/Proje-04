module.exports = {
    execute(client, socket){
        socket.on("saveDmBox", data => {
            const script2 = `INSERT INTO ${data.user}_DmBoxList(name, comment) VALUES(
                '${data.name}',
                '${data.comment}'
            )` 
            client.db.run(script2)
            const script1 = `CREATE TABLE IF NOT EXISTS ${data.name}_${data.user}_DmBox(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                message TEXT,
                user TEXT)`
            client.db.run(script1)
            if(client.fs.existsSync(`./page/users/${data.user}/`))
            {
                console.log("mkdir skipped")
            }
            else
            {
                client.fs.mkdirSync(`./page/users/${data.user}/`)
            }
            client.fs.writeFileSync(`./page/users/${data.user}/${data.name}_DmBox.html`,
                client.fs.readFileSync("./page/example.txt","utf-8").toString()
            )
            socket.emit("saveDmBox", data)
        })
        
    }
}