module.exports = {
    execute(client, socket){
        socket.on("joinDmBox", data => {
            const script1 = `SELECT * FROM ${data.user}_DmBoxList`
            client.db.all(script1, (err, rows) => {
                rows.forEach(row => {
                    if(data.name == row.name)
                    {
                        console.log("girilen isim bulundu")
                        if(client.fs.existsSync(`./page/users/${data.user}/`))
                        {
                            console.log("mkdir skipped")
                        }
                        else
                        {
                            client.fs.mkdirSync(`./page/users/${data.user}/`)
                        }
                        const script3 = `INSERT INTO ${data.sender}_DmBoxList(name, comment) VALUES(
                            '${data.name}',
                            '${data.comment}'
                        )` 
                        client.db.run(script3)
                        const script2 = `CREATE TABLE IF NOT EXISTS ${data.name}_${data.sender}_DmBox(
                            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            message TEXT,
                            user TEXT)`
                        client.db.run(script2)
                        client.fs.copyFileSync(`./page/users/${data.user}/${data.name}_DmBox.html`,
                        `./page/users/${data.sender}/${data.name}.html`)
                    }
                })
            })
        })
    }
}