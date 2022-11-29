export default (client) => {
    client.socket.on("joinDmBox", data => {
        localStorage.setItem("pathName",data.user)
    })
    
    
}