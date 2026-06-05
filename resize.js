const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./original";
const outputFolder = "./resized";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  const inputPath = path.join(inputFolder, file);
  const outputPath = path.join(outputFolder, file);

  sharp(inputPath)
    .resize(600, 1000)
    .png()
    .toFile(outputPath)
    .then(() => {
      console.log(`${file} redimensionada com sucesso.`);
    })
    .catch(err => {
      console.log(`Erro em ${file}:`, err);
    });
});