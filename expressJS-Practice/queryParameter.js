const express = require('express');
const app = express();

app.get("/search",(req,res)=>{
    let name = req.query.name;
    res.send("Searching for: " +name);
});

app.listen(1000);


// http://localhost:1000/search?name=willian