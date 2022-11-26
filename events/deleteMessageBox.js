module.exports = {
    "moduleName":"deleteMessageBox",
    execute(client, socket){
        socket.on("deleteMessageBox", datas => {
            client.db.all(`SELECT * FROM ${datas.sender}sMessageBoxs `, (err, rows) => {
                rows.forEach(row => {           
                    console.log(row)
                    if(row.name == datas.name)
                    {
                        var liteRun = `DROP TABLE IF EXISTS ${datas.name}`
                        client.db.run(liteRun)
                        client.db.run(`DELETE FROM ${datas.sender}sMessageBoxs WHERE id = '${datas.value}';`)
                        client.fs.rmSync(`./page/users/${datas.sender}`,{recursive: true, force: true})
                    }
                });
              })
            socket.emit("deleteMessageBox", datas)
        })
    }
}