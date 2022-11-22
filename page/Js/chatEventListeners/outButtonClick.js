function execute(socket, item, dt, btn, out) {
    out.addEventListener("click", () => {
        if(localStorage.getItem("remember")){
            localStorage.clear()
        }
    })
}

export default execute
