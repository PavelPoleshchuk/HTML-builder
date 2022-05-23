const path = require("path");
const fs = require("fs");

const pathText = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(pathText, "utf-8");

let data = "";
stream.on("data", (chunk) => (data += chunk));
stream.on("error", (error) => console.log("Error", error.message));
stream.on("end", () => console.log(data));
