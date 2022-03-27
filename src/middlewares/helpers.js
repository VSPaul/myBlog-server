const fs = require('fs');

const saveFile = (file, fullName) => {
    // console.log('IN SAFE FILE', file);

    const url = `./src/posts`;

    fs.writeFile(`${url}`, file.data, err => {
        if (err) {
            console.log("err", err)
        }
    })
    return url
};


const helpers = {
    saveFile: saveFile,
};

module.exports = helpers;