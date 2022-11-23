function execute(client) {
    client.socket.on("auth", datas => {
        //Yerel depolamada veri varsa otomatik giriş için
        if(!client.item){
            for (const data of datas) {
                if(client.item.token == data.token){
                //Token ile giriş yapılıyorsa şifre istemez
                window.location.href = "http://localhost:3000/"
    
                }
            }  
        }
        
    })
}

export default execute
