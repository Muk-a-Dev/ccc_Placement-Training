const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get("/about", (req,resp)=>{
    res.send('About page')
});

app.get("/contact", (req,resp)=>{
    res.send('Contact page')
});

app.listen(5000);