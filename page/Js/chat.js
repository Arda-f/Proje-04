//Dökümandan içerik çekilir
const socket = io.connect("http://localhost:3000")
const msgs = document.getElementById("msgArea") 
const dt = document.getElementById("data")
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
const item = JSON.parse(localStorage.getItem(localStorage.key(0)))
//Başlangıçta mesaj aşağıda olmalı
msgs.innerText = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
//Göndere tıklandığında yapılacaklar
btn.addEventListener("click", () => {
    socket.emit("chat", {message:dt.value, sender:item.user})
    socket.emit("writing", {sender: "\n"})
    feedback.innerText = "\n"
})
//Yazarken Enter'a basarsa yapılacaklar
dt.addEventListener("keypress", e => {if(e.key == "Enter"){socket.emit("chat", {message:dt.value, sender:item.user})}})
 
document.addEventListener("DOMContentLoaded", () => {
    socket.emit("history", {message: "", users: ""})
    if(item.user != ""){
        socket.emit("auth", {user:item.user, pass:item.pass}) 
    }

})
socket.on("auth", datas => {
    //Yerel depolamada veri varsa otomatik giriş için
    if(!item){
        for (const i in datas) {
            if(item.token == datas[i].token){
            //Token ile giriş yapılıyorsa şifre istemez
            window.location.href = "http://localhost:3000/"

            }
        }  
    }
    
})
//Geçmiş mesajları yükleyen bölüm
socket.on("history", datas => {
    if(item){
       datas.forEach(result => {
        if(item.user == result.users){
            msgs.innerHTML += 
                `<div style='witdh:100%; '>
                    <div class='right' id='msg'>
                        ${result.message}
                    </div>
                 </div>`
        }
        else{
            msgs.innerHTML +=   
            `<div style='witdh:100%;'>
                <div class='left' id='msg'>
                    ${result.message}
                    </div>
             </div>`
            }

        msgs.scrollTo({top:9999999999999999999})
    }) 
    }
    else{
        window.location.href = "http://localhost:3000/"

    }
    

})
//Yazıyor... kısmı
//     data.addEventListener("input", () => {
//         if(data.value == ""){
//             feedback.innerText = "\n"
//         }
//         else{
//             socket.emit("writing", {sender: socket.id})
//         }
//     })

//  socket.on("writing", (datas) => {
//     var usr = datas.sender + " yazıyor..."
//     if(socket.id == datas.sender){
//        feedback.innerText =  `\n` 
//     }
//     else{
//         feedback.innerText =  `${usr}`
//         feedback.style= "color:white;"  
//     }
// })
//Soket üzerinden yapılacak işlemler
socket.on("chat", datas => {   
    

    if (datas.message == "") {}
    //Mesajı gönderen taraftın gördüğü
    else{
        al(socket, datas, msgs)
    }
})

function al(socket, datas, msgs) {
    if(item.user == datas.sender){
        msgs.innerHTML += 
        `<div style='witdh:100%; '>
            <div class='right' id='msg'>
                ${datas.message}
            </div>
        </div>`
    }
    //Mesajı alan taraftın gördüğü
    else{
        msgs.innerHTML +=   
        `<div style='witdh:100%;'>
            <div class='left' id='msg'>
                ${datas.message}
            </div>
        </div>`
    }
    //Her yeni mesaj geldiğinde sayfa aşağıya inmeli
    msgs.scrollTo({top:9999999999999999999})
    //Mesaj atıldıktan sonra kutuyu temizliyor
    dt.value = ""
}   