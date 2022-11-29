export default (client) => {
    client.join.addEventListener("click", () => {
        const a = document.createElement("a")
        a.href = "#"
        a.innerHTML += 
        `
        <div class="MessageBox">
            <img src="resim1.jpg" alt="">
            <div id="contents">
                <div>
                    <input class="joinName" placeholder='User Name'>
                </div>
                <div>
                    <input class="joinSpan" placeholder='Box Name'>
                </div>
            </div>
        </div>
        `
        client.MessageBoxArea.appendChild(a)
        
        const joinName = document.querySelectorAll("input[class='joinName']")
        const joinSpan = document.querySelectorAll("input[class='joinSpan']")
        for (let i = 0; i < joinName.length; i++)
        {
            joinSpan[i].addEventListener("keypress", e => {
                if(e.key == "Enter" && joinSpan[i].value != "")
                {
                    const Name = document.createElement("div")
                    const Span = document.createElement("div")
                    Name.className = "selfName"
                    Span.className = "selfSpan"
                    Name.innerText = joinName[i].value
                    Span.innerText = joinSpan[i].value
                    joinName[i].replaceWith(Name)
                    joinSpan[i].replaceWith(Span)
                    client.socket.emit("joinDmBox",{
                        name: joinSpan[i].value,
                        user: joinName[i].value,
                        sender: JSON.parse(localStorage.getItem("user-info")).user
                    })
                }
            })
        }
    })
}