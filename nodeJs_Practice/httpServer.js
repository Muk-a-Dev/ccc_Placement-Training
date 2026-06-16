//handling HTTP requests

const http = require('http');
const server = http.createServer((req, res) => {
    res.write("welcome to MERN Learning");
    res.end();
});

server.listen(5000,() => {
    console.log("Server Running on port 5000");
});
