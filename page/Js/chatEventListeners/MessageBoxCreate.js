function execute(client) {
    //=====================//Mesaj Kutusu Oluştur Butonuna Tıklandığında Yapılacaklar//=====================//
    client.addBox.addEventListener("click", () => {
        //=====================//Mesaj Kutusunu Oluşturur//=====================//
        const a = document.createElement("a")
        a.href = "#"
        a.innerHTML = `<div class="MessageBox"><img src="resim1.jpg" alt=""><div id="contents"><div><input class="selfName" placeholder='MessageBox Name'></div><div><input class="selfSpan" placeholder='MessageBox Comment'></div></div></div>`
        client.MessageBoxs.appendChild(a)
        //=====================//selfName ve selfSpan Classına Sahip Elementleri Çeker//=====================//
        client.selfNames = document.getElementsByClassName("selfName")
        client.selfSpan = document.getElementsByClassName("selfSpan")
        //=====================//selfName Dizisi Uzunluğunda Döngü Oluşturur//=====================//
        for (let i = 0; i < client.selfNames.length; i++)
        {
            //=====================//Dizideki Her Bir Nesneyi Alır//=====================//
            const selfName = client.selfNames[i];
            const selfSpan = client.selfSpan[i];
            //=====================//Aldığı Nesne Altından TuşBasıldı Olayı Döndürür//=====================//
            selfSpan.addEventListener("keypress", (e) => {
                if(e.key == "Enter" && selfSpan.value != "" && selfName.value != "")
                {
                    //=====================//Veri Girişinin Kapanmasını Sağlar//=====================//
                    const span = document.createElement("span")
                    const div = document.createElement("div")
                    span.innerText = selfSpan.value
                    span.className = "selfName"
                    div.innerText = selfName.value
                    div.className = "selfSpan" 
                    selfSpan.replaceWith(span)
                    selfName.replaceWith(div)
                    //=====================//Soket Üzerinden createMessageBox Olayı Başlatır//=====================//
                    client.socket.emit("createMessageBox",{
                        sender:JSON.parse(localStorage.getItem("user-info")).user,
                        name: client.selfSpan.item(i).innerText,
                        comment: client.selfNames.item(i).innerText
                    })
                    client.socket.on("createMessageBox", () => {
                        document.location.reload()
                    } )
                }
            })
        }
    })
}

export default execute