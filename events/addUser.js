module.exports = {
  "moduleName":"addUser",
  execute(client, socket){
    // var db = new client.sqlite.Database("./database/logedUsers.sqlite",(e) => {if(e){console.log(e)}})

    socket.on("addUser", datas => {
        datas.token = Math.floor(Math.random()* 100000000000)
        const run1 = `INSERT INTO userİnfo(user, email, pass, token)
              VALUES('${datas.user}',
                     '${datas.email}',
                     '${datas.pass}',
                     '${datas.token}')`
        let bool = true
        // // // // // // // // // // // // // // // // // // // // // //             
        if(datas.user == "" || datas.pass == "") 
        {
            console.log("kullanıcı adı boş olamaz")
        }
        else
        {
            client.db.all("SELECT email FROM userİnfo", (err, rows) => {
                for (const row of rows) 
                {
                    if(row.email == datas.email){bool = false; break;}
                };
                if(bool){client.db.run(run1)}  
            })
        }
    socket.emit("addUser", datas)
    })
    }
}