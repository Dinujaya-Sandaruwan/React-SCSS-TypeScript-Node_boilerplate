const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.json('Server is working!');
});

app.listen(4000);
