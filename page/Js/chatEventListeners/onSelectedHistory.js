function execute(client) {
    //Geçmiş mesajları yükleyen bölüm
    client.socket.on("selectedHistory", datas => {   
        // console.log(datas) 
        // if(client.item)
        // {
        //     datas.forEach(result => {
        //         if(client.item.user == result.users)
        //         {
        //             client.msgs.innerHTML += `<div style='witdh:100%; '><div class='right' id='msg'>${result.message}</div></div>`
        //         }
        //         else
        //         {
        //             client.msgs.innerHTML += `<div style='witdh:100%;'><div class='left' id='msg'>${result.message}</div></div>`
        //         }
        //         client.msgs.scrollTo({top:9999999999999999999})
        //     }) 
        // }
        // else
        // {
        //     window.location.href = "http://localhost:3000/"
        // }
    })
}



export default execute
