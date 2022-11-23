function execute(client) {
    client.socket.on("auth", datas => 
    {
        //Yerel depolamada veri varsa otomatik giriş için
        const item = JSON.parse(localStorage.getItem("user-info"))
        if(item)
        {
            for (const i in datas)
            {
                //Token ile giriş yapılıyorsa şifre istemez
                if(item.token == datas[i].token)
                {
                    window.location.href += "chat.html"
                }
            }
        }
        //Döngü ile i indexteki satırın bilgilerini çeker
        for (const data of datas)
        {
            if(client.username.value == data.token)
            {
                //Token ile giriş yapılıyorsa şifre istemez
                //Oturumun açık kalması için yerel depolamaya veri gönderir
                localStorage.setItem("user-info", JSON.stringify(data))
                if(client.remember.checked){localStorage.setItem("remember",true)}
                else{localStorage.setItem("remember",false)}
                window.location.href = "chat.html"
            }
            else
            {
                //Kullanıcı adı veya email ile şifeyi sorgular
                if(client.username.value == data.user || client.username.value == data.email && client.pass.value == data.pass)
                {
                    //Oturumun açık kalması için yerel depolamaya veri gönderir
                    localStorage.setItem("user-info", JSON.stringify(data))
                    if(client.remember.checked){localStorage.setItem("remember",true)}
                    else{localStorage.setItem("remember",false)}
                    window.location.href = "chat.html"
                }  
            }
        }
        // console.log(JSON.parse(localStorage.getItem("user-info")))
    })
}

export default execute
