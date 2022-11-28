function execute(client) {
    client.socket.on("auth", datas => {
        const user =  JSON.parse(localStorage.getItem("user-info")).user
        window.location.href = `http://localhost:3000/users/${user}/`
    })
}

export default execute