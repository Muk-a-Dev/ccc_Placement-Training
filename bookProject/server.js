const express = require('express');
const cors = require('cors');
const app = express();
require("./db");
const bookRoutes = require("./routes/books");

app.use(cors());
app.use(express.json());
app.use(
    express.static("public")
);

app.use("/api/books", bookRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

