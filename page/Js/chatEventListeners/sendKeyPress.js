function execute(socket, item, dt, btn) {
    dt.addEventListener("keypress", e => {
        if(e.key == "Enter"){
            socket.emit("chat", {
                message:dt.value,
                sender:item.user
            })
        }
    })
}

export default execute
