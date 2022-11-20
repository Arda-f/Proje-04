const socket = io.connect("http://localhost:3000")
const btn = document.getElementById("btn")
const user = document.getElementById("username")
const pass = document.getElementById("pass")
const users = document.getElementById("users")
btn.addEventListener("click", () => {
    socket.emit("setUser", {user:user.value, pass:pass.value}) 
})

socket.on("setUser", datas => {
    var primary = ""
    if(primary != datas.pass){
        users.innerHTML += 
        `<tr>
            <td>${datas.user}</td>
            <td>${datas.pass}</td>
        </tr>`
    }
    primary = datas.pass    
})
