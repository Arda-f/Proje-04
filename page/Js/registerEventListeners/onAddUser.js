function execute(client) {
    client.socket.on("addUser", datas => {
        if(datas.user == "" || datas.pass == "")
        {
            alert("kullanıcı adı veya şifre boş bırakıldı")
        }
        else
        {
            localStorage.setItem("user-info", JSON.stringify(datas))
            window.location.href = "http://localhost:3000/chat.html"
        }
    })
}

export default execute