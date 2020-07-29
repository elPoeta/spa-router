const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const lookup = require("mime-types").lookup;
const PORT = 3000;

const httpServer = (req, resp) => {
    let parsedURL = url.parse(req.url, true);
    let urlPath = parsedURL.path.replace(/^\/+|\/+$/g, "");
    if (urlPath == "") {
        urlPath = "index.html";
    }
    let file = __dirname + "/public/" + urlPath;
    let mime = lookup(urlPath);
    res.writeHead(200, { "Content-type": mime });
    const readStream = fs.createReadStream(file, { encoding: 'utf-8' });
    readStream.on('error', error => {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        res.end();
    });
    res.statusCode = 200;
    readStream.pipe(res);
}

const server = http.createServer(httpServer);

server.listen(PORT, 'localhost', error => {
    if (error) console.log(`Error to init server `, error);
    console.log(`Server ran on port: ${PORT}`);
});

