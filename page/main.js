//Dökümandan içerik çekilir
const socket = io.connect("http://localhost:3000")
const msgs = document.getElementById("msgArea") 
const dt = document.getElementById("data")
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
//Başlangıçta mesaj aşağıda olmalı
msgs.innerText = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
//Göndere tıklandığında yapılacaklar
btn.addEventListener("click", () => {
    socket.emit("chat", {message:dt.value, sender:socket.id})
    feedback.innerText = "\n"
})
//Yazarken Enter'a basarsa yapılacaklar
dt.addEventListener("keypress", e => {
    if(e.key == "Enter"){
        socket.emit("chat", {message:dt.value, sender:socket.id})
        feedback.innerText = "\n"
    }
})

document.addEventListener("DOMContentLoaded", () => {
    socket.emit("history", {message: "", users: ""})
})

//Geçmiş mesajları yükleyen bölüm
socket.on("history", datas => {
    datas.forEach(result => {
        if(socket.id == datas.sender){
            msgs.innerHTML += 
                `<div style='witdh:100%; '>
                    <div class='right' id='msg'>
                        ${result.message}
                    </div>
                 </div>`}
        else{
            msgs.innerHTML +=   
            `<div style='witdh:100%;'>
                <div class='left' id='msg'>
                    ${result.message}
                    </div>
             </div>`}

        msgs.scrollTo({top:9999999999999999999})
    })

})

//Soket üzerinden yapılacak işlemler
socket.on("chat", datas => {   
//Yazıyor... kısmı
    data.addEventListener("input", () => {
        if(data.value == ""){
            feedback.innerText = "\n"
        }
        else{
            feedback.innerText =  `${datas.sender} yazıyor...`
            feedback.style= "color:white;"
        } 
        })

        if (datas.message == "") {}
        //Mesajı gönderen taraftın gördüğü
        else{
        if(socket.id == datas.sender){
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
})