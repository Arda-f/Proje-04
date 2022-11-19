const fs = require("fs")
const eventFiles = fs.readdirSync("./events", "utf-8").filter(file => file.endsWith(".js"))


