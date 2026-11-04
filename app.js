const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        message: "ShopEase is running!"
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`ShopEase running at http://localhost:${PORT}`);
    });
}

module.exports = app;