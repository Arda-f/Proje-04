module.exports = {
  "moduleName":"addUser",
  execute(socket, io, DBUSERS, sqlite){
        // socket.on("logedUser", data => {
    //     socket.emit("logedUser", data)
    //     db.run(`INSERT INTO userData(user, pass) VALUES('${data.user}','${data.pass}')`) 
    // })
    var db = new sqlite.Database("./database/logedUsers.sqlite",(e) => {if(e){console.log(e)}})

    socket.on("addUser", datas => {
        datas.token = Math.floor(Math.random()* 100000000000)
        const run1 = `INSERT INTO userData(user, email, pass, token)
                     VALUES('${datas.user}',
                     '${datas.email}',
                     '${datas.pass}',
                     '${datas.token}')`
        let bool = true
        // // // // // // // // // // // // // // // // // // // // // //             
        if(datas.user == "" || datas.pass == "") {console.log("kullanıcı adı boş olamaz")}
        else{
            db.all("SELECT email FROM userData", (err, rows) => {
                for (const row of rows) {
                    if(row.email == datas.email){bool = false; break;}
                };
                if(bool){db.run(run1)}  
            })
        }
    socket.emit("addUser", datas)
    })
    }
}