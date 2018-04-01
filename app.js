const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    var path = (req.url === '/') ? './public/example.html' : './public' + req.url;
    fs.readFile(path, (err, file) => {
        console.log(err);
        if (err) {
            res.writeHead(404);
            res.end('404 not found', 'utf-8');
        }
        else {
            res.writeHead(200);
            res.end(file, 'utf-8');
        }
    });
});

server.listen('3000', () => ('Server is running'));
