module.exports = {
    "moduleName":"setDmBox",
    execute(client, socket){
        socket.on("waitSetName", data => {
            const script1 = `CREATE TABLE IF NOT EXISTS ${data.user}_DmBoxList(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                comment TEXT)`
            client.db.run(script1)
        })
    }
}