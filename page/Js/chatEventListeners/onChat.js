function execute(client) {
    client.socket.on("chat", datas => {   
        if (datas.message == "") {}
        //Mesajı gönderen taraftın gördüğü
        else{
            if(client.item.user == datas.sender){
                client.msgs.innerHTML += 
                `<div style='witdh:100%; '>
                    <div class='right' id='msg'>
                        ${datas.message}
                    </div>
                </div>`
            }
            //Mesajı alan taraftın gördüğü
            else{
                client.msgs.innerHTML +=   
                `<div style='witdh:100%;'>
                    <div class='left' id='msg'>
                        ${datas.message}
                    </div>
                </div>`
            }
            //Her yeni mesaj geldiğinde sayfa aşağıya inmeli
            client.msgs.scrollTo({top:9999999999999999999})
            //Mesaj atıldıktan sonra kutuyu temizliyor
            client.dt.value = ""
        }
    })
}

export default execute
