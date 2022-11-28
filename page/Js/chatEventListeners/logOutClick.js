export default (client) => {
    client.logout.addEventListener("click", () => {
        localStorage.clear()
        document.location.reload()
    })
}