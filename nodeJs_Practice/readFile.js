//reading the file
const fs = require('fs');
fs.readFile('students.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
        console.log("Student Data");
        console.log(data);
    });