const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there is an error, reject the promise and send the error to the promise's `catch ` method
            if (err) {
                reject(err);
                return;
            }

            // if everything went well, resolve the promise and send the successful data to the `then` method
            resolve({
                ok: true,
                message: 'File created'
            });

        });
    });
};

const copyFile = () => {
    return new Promise((resolve,reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'file copied'
            });
        });
    });
};

module.exports = { writeFile, copyFile }
