//Writing in the file

const fs = require('fs');
const students = "Name: Max Verstappen,\nCourse: MERN,\nCountry: Netherlands\n";
fs.writeFile('students.txt', students, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File created successfully');    
});