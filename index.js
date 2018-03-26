const fs = require('fs');
const path = require("path");

const dir = process.argv[2];

fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        const date = inferDate(file);
        if (date) {
            fs.utimes(path.join(dir, file), date, date, (err) => { if (err) throw err; });
        } else {
            console.log(file);
        }
    });
});


function inferDate(fileName) {
    if (/Screenshot_\d{4}(\-\d\d){5}\.png/.test(fileName)) {
        const parts = fileName.replace("Screenshot_", '').replace(".png", '').split("-");
        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    }
    if (/Screenshot \d{4}(\-\d\d){5}\.png/.test(fileName)) {
        const parts = fileName.replace("Screenshot ", '').replace(".png", '').split("-");
        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    }
}

