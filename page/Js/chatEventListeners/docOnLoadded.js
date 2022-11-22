function execute(socket, item, dt, btn, out) {
    document.addEventListener("DOMContentLoaded", () => {
        socket.emit("history", {message: "", users: ""})
        if(item.user != ""){
            socket.emit("auth", {user:item.user, pass:item.pass}) 
        }
    })
}

export default execute
