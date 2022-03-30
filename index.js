var http = require('http'),
    fs = require('fs');

http.createServer(function (_, response) {
    fs.readFile('./src/views/layout.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
}).listen(8000);

// Source: https://stackoverflow.com/a/4728481