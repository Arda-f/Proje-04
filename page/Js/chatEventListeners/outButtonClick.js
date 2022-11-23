function execute(client) {
    client.out.addEventListener("click", () => {
        localStorage.clear()
        window.location.href = "http://localhost:3000/"
    })
}

export default execute
