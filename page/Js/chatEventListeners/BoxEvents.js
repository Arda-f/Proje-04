export default (client) => {
    client.socket.on("loadDmBox", data => {
        data.forEach(value => {
            //BoxLoader
            const a = document.createElement("div")
            a.href = "#"
            a.className = "allBox"
            a.innerHTML = 
            `<a href="${value.name}_DmBox.html">
                <div class="MessageBox"><img src="resim1.jpg" alt="">
                <div id="contents">
                    <div>
                        <div class='name'>${value.name}</div>
                    </div>
                    <div>
                        <div>${value.comment}</div>
                    </div>
                </div>
                
            </div>`
            client.MessageBoxArea.appendChild(a)
            const button = document.createElement("button")
            button.value = value.id
            button.className = "deleteMessageBox"
            button.innerText = "Delete"
            a.appendChild(button)
            a.addEventListener("click", () => {
                client.socket.emit("dmBoxClicked", {
                    pagePath: document.location.pathname,
                    hrefPath: `/users/federaliste/${value.name}.html`
                })
            localStorage.setItem("pageName",value.name)
            })
        })
        //BoxDeleteButton
        const buttons = document.querySelectorAll("button[class='deleteMessageBox']")
        for (const button of buttons)
        {
            button.addEventListener("click", () => {
                console.log("delete clicked")
                const btnName = button.parentElement.children[0].children[0].children[1].children[0].children[0].textContent
                client.socket.emit("deleteDmBox",{
                    user: JSON.parse(localStorage.getItem("user-info")).user,
                    name: btnName,
                    value: button.value
                })
                document.location.href = "index.html"
            })
        }
    })
    // console.log(document.querySelectorAll("button[class='deleteMessageBox']"))
    
}