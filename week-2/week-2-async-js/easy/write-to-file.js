const fs = require("fs").promises;

async function writeToFile() {
  try {
    const data = await fs.readFile("a.txt", { encoding: "utf-8" });
    console.log(`The content before modification:${data}`);
  } catch (err) {
    console.log(err);
  }

  let content = "new content of a.txt";
  try {
    await fs.writeFile("a.txt", content, { encoding: "utf-8" });
    console.log("File successfully written!");
  } catch (err) {
    console.log(err);
  }
  try {
    const data = await fs.readFile("a.txt", { encoding: "utf-8" });
    console.log(`The content after modification:${data}`);
  } catch (err) {
    console.log(err);
  }
}

writeToFile();
