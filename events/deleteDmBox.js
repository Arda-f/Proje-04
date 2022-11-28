module.exports = {
    execute(client, socket){
        socket.on("deleteDmBox", data => {
            var liteRun = `DROP TABLE IF EXISTS ${data.name}_${data.user}_DmBox`
            client.db.run(liteRun)
            client.db.run(`DELETE FROM ${data.user}_DmBoxList WHERE id = '${data.value}';`)
            client.fs.rmSync(`./page/users/${data.user}/${data.name}_DmBox.html`,{recursive: true, force: true})
        })
    }
}