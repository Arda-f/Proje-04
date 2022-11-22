function execute(socket, item, dt, btn) {
    btn.addEventListener("click", () => {
        socket.emit("chat", {
            message:dt.value, 
            sender:item.user
        })
        socket.emit("writing", {
            sender: "\n"
        })
        // feedback.innerText = "\n"
    })
}

export default execute
