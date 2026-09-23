const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running!"
    });
});

app.get("/tasks", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Learn Jenkins",
            completed: false
        },
        {
            id: 2,
            title: "Learn Docker",
            completed: false
        }
    ]);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;