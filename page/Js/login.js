const socket = io.connect("http://localhost:3000")
const login = document.getElementById("login")
const remember = document.getElementById("rem")
const username = document.getElementById("username")
const pass = document.getElementById("password")
//Sayfa yüklendiğinde giriş yapılmışsa otomatik olarak giriş yapmasını sağlar
document.addEventListener("DOMContentLoaded", (e) =>{
    const item = JSON.parse(localStorage.getItem("user-info"))
    if(item.user != ""){
        socket.emit("auth", {user:item.user, pass:item.pass}) 
    }
})
//Butona tıklamadan Enter ile giriş işlemini sağlarlar
username.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        socket.emit("auth", {user:".", pass:"."})
    }
})
pass.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        socket.emit("auth", {user:".", pass:"."})

    }
})
//Butona tıklandığında giriş işlemlerini sağlar
login.addEventListener("click", () => {
    socket.emit("auth", {user:username.value, pass:pass.value})
})
//Karşı taraftan gelen bilgileri işler
socket.on("auth", datas => {
    //Yerel depolamada veri varsa otomatik giriş için
    const item = JSON.parse(localStorage.getItem("user-info"))
    if(item){
        for (const i in datas) {
            //Token ile giriş yapılıyorsa şifre istemez
            if(item.token == datas[i].token){
                
                window.location.href += "chat.html"
            }
        }
    }
    //Döngü ile i indexteki satırın bilgilerini çeker
    for (const i in datas) {
        if(username.value == datas[i].token){
            //Token ile giriş yapılıyorsa şifre istemez
            //Oturumun açık kalması için yerel depolamaya veri gönderir
            localStorage.setItem("user-info", JSON.stringify(datas[i]))
            if(remember.checked){localStorage.setItem("remember",true)}
            else{localStorage.setItem("remember",false)}
            window.location.href = "chat.html"
        }
        else{
            //Kullanıcı adı veya email ile şifeyi sorgular
            if(username.value == datas[i].user || username.value == datas[i].email && pass.value == datas[i].pass){
                //Oturumun açık kalması için yerel depolamaya veri gönderir
                localStorage.setItem("user-info", JSON.stringify(datas[i]))
                if(remember.checked){localStorage.setItem("remember",true)}
                else{localStorage.setItem("remember",false)}
                window.location.href = "chat.html"
            }  
        }
    }
    // console.log(JSON.parse(localStorage.getItem("user-info")))
})

