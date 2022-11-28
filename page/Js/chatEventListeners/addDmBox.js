export default (client) => {
    client.addBox.addEventListener("click", () => {
        const a = document.createElement("a")
        a.href = "#"
        a.innerHTML += 
        `
        <div class="MessageBox">
            <img src="resim1.jpg" alt="">
            <div id="contents">
                <div>
                    <input class="selfName" placeholder='MessageBox Name'>
                </div>
                <div>
                    <input class="selfSpan" placeholder='MessageBox Comment'>
                </div>
            </div>
        </div>
        `
        client.MessageBoxArea.appendChild(a)
        client.selfName = document.querySelectorAll("input[class='selfName']")
        client.selfSpan = document.querySelectorAll("input[class='selfSpan']")
    })
}