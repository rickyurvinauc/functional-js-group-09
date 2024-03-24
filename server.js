const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.get('/getMarkdown', function (req, res) {
    fs.readFile('example.md', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo example.md:', err);
            res.status(500).send('Error al leer el archivo');
        } else {
            res.send(data);
        }
    });
});
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Server is listening on http://localhost:${port}`);
});