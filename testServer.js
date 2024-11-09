const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    console.log("Test route hit");
    res.send("Hello from test route!");
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
});
