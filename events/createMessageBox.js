module.exports = {
    "moduleName":"createMessageBox",
    execute(client, socket){
        socket.on("createMessageBox", datas => {
            socket.emit("createMessageBox", datas)
            var liteRun2 = `INSERT INTO ${datas.sender}sMessageBoxs(name, comment) VALUES('${datas.name}','${datas.comment}')`
            client.db.run(liteRun2)
            if(client.fs.existsSync(`./page/users/${datas.sender}/`))
            {
                console.log("mkdir skipped")
            }
            else
            {
                client.fs.mkdirSync(`./page/users/${datas.sender}/`)
            }
            client.fs.writeFileSync(`./page/users/${datas.sender}/${datas.name}.html`,`
                <div>a</div>
            `)
        })
    }
}