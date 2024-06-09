const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

async function convertHeicToJpg(directory) {
    try {
        const files = await fs.promises.readdir(directory);
        const filePaths = [];

        for (const file of files) {
            const filePath = path.join(directory, file);
            const fileStat = await fs.promises.stat(filePath);

            if (fileStat.isFile() && path.extname(file).toLowerCase() === '.heic') {
                const outputFilePath = path.join(directory, `${path.basename(file, '.heic')}.jpg`);
                await execPromise(`convert "${filePath}" "${outputFilePath}"`);
                filePaths.push(outputFilePath);
            }
        }

        console.log(JSON.stringify(filePaths, null, 2));
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage
const directoryPath = './public/testimonials';
convertHeicToJpg(directoryPath);
