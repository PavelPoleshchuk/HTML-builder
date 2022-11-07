const { readdir, stat } = require('fs/promises');
const { stdout } = process;
const fs = require('fs');
const path = require('path');
let data = '';

const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');

async function mergeFiles(source, dest) {
  try {
    const files = await readdir(source, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && (path.parse(file.name).ext).slice(1) === 'css') {
        const dataOfFile = await stat(path.join(source, file.name));
        const streamRead = fs.createReadStream(path.join(source, file.name), { highWaterMark: dataOfFile.size }, 'utf8');
        const writeStream = fs.createWriteStream(path.join(dest, 'bundle.css'), 'utf8');

        streamRead.on('data', chunk => data += chunk);
        streamRead.on('end', () => writeStream.write(data));

      } else if (file.isDirectory()) {
        await mergeFiles(path.join(source, file.name));
      }
    }
  } catch (err) {
    stdout.write(err);
  }
}

mergeFiles(srcPath, destPath);