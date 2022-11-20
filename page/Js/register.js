const socket = io.connect("http://localhost:3000")
const login = document.getElementById("login")
const remember = document.getElementById("rem")
const username = document.getElementById("username")
const pass = document.getElementById("password")
const pass2 = document.getElementById("password2")
const email = document.getElementById("email")

document.addEventListener("DOMContentLoaded", () => {
    const item = JSON.parse(localStorage.getItem(localStorage.key(0)))
    socket.emit("auth", {user:item[0], pass:item[1], token:item[2]})    
})

login.addEventListener("click", () => {
    if(pass.value == pass2.value){
   socket.emit("addUser", {user:username.value, email:email.value, pass:pass.value, token:""})
}
})

pass.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        if(pass.value == pass2.value){
        socket.emit("addUser", {user:username.value, pass:pass.value, token:""})
    }}
})

socket.on("auth", datas => {
    window.open("../chat.html")
})

socket.on("addUser", datas => {
    let items = [datas.user, datas.email, datas.pass] 
    if(remember.checked){
        if(datas.user == "" || datas.pass == ""){console.log("kullanıcı adı veya şifre boş bırakıldı")}
        else{
        localStorage.setItem("user-info", JSON.stringify(items))
        }
    }
})

