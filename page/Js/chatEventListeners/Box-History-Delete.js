function execute(client) {
    //=====================//Mesaj Kutusu Geçmişi Olayı Dinleniyor//=====================//
    client.socket.on("MessageBoxHistory", (datas) => {
        // console.log(datas)
        for (let i = 0; i < datas.length; i++)
        {
            //=====================//Mesaj Kutuları Ekleniyor//=====================//
            const a = document.createElement("a")
            a.href = "#"
            a.className = "allBox"
            a.innerHTML = `<div class="MessageBox"><img src="resim1.jpg" alt=""><div id="contents"><div><div class='name'>${datas[i].name}</div></div><div><div>${datas[i].comment}</div></div></div><div><button value='${datas[i].id}' class="deleteMessageBox">Delete</button></div></div>`
            client.MessageBoxs.appendChild(a)
        }
        //=====================//Mesaj Kutusuna Ait Mesaj Geçmişini Yükler//=====================//
        var MessageBoxs = document.getElementsByClassName("allBox")
        var Names = document.getElementsByClassName("name")
        for (let i = 0; i < MessageBoxs.length; i++) 
        {
            const MessageBox = MessageBoxs[i];
            MessageBox.addEventListener("click", () => {
                client.socket.emit("selectedHistory", {
                    selfName: Names[i].textContent,
                    sender: JSON.parse(localStorage.getItem("user-info")).user
                })

            })

        //=====================//Mesaj Kutusunu Silme İşlemini Uygular//=====================//
        }
        var del = document.getElementsByClassName("deleteMessageBox")
        for (const item of del)
            {
                item.addEventListener("click", () => {
                    const names = item.parentElement.parentElement.children[1].children[0].children[0].textContent
                    client.socket.emit("deleteMessageBox", {
                        name: names,
                        value: item.value,
                        sender: JSON.parse(localStorage.getItem("user-info")).user
                    })
                    document.location.reload()
                })
            }
       
        
    })
}

export default execute