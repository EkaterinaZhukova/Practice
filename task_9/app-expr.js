const express = require('express');

const app = express();
app.use(express.static('./public'));
app.get('/', function(req, res) {
    res.sendfile('./public/example.html');
});
app.listen(3000, () => console.log('Сервер работает'));
