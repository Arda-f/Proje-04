function execute(client) {
       client.dt.addEventListener("keypress", e => {
        if(e.key == "Enter")
        {
            client.socket.on("selectedHistory",(datas) => { 
                client.socket.emit("chat", {
                    message:client.dt.value,
                    sender:client.item.user,
                    selfName: datas.selfName
                })
            })
        }
    }) 
}

export default execute
