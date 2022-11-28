export default (client) => {
    client.messageButton.addEventListener("click", () => {
        client.socket.emit("sendMessage",{
            message: client.messageİnput.value,
            user: JSON.parse(localStorage.getItem("user-info")).user,
            pageName: localStorage.getItem("pageName")
        })
        client.messageİnput.value = ""
    })
}