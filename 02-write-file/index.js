const { stdin } = process;
const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "text.txt"), '',(error) => {
  if (error) return console.error(error.message);
});

console.log("Введите текст");
process.on("SIGINT", handle);
function handle() {
  console.log("Вы вышли из программы");
  process.exit();
}

stdin.on("data", (data) => {
  console.log("Хотите еще добавить текст?");
  fs.appendFile(path.join(__dirname, "text.txt"), checkData(data), (err) => {
    if (err) throw err;
  });
});
function checkData(content) {
  if (content.toString().trim() == "exit") {
    handle();
  } else {
    return content;
  }
}
