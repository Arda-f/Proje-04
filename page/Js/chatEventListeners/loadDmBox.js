export default (client) => {
    client.socket.emit("loadDmBox", {
        user: JSON.parse(localStorage.getItem("user-info")).user,
        buttons: document.querySelectorAll("button[class='deleteMessageBox']")
    })
}