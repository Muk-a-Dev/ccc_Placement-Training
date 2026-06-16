const express = require('express');
const app = express();

app.get('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send("Student ID: " + studentId);
});

app.listen(3000);