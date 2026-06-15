//used in API and database
//stringfy() - to parse JSON data

let student = {name: "XXXX", age: 21};

//stringfy - object to JSON
let jsonData = JSON.stringify(student);
console.log(jsonData);

//parse - JSON to object
let objectData = JSON.parse(jsonData);
console.log(objectData);
