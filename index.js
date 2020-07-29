const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const PORT = 3000;

const httpServer = (req, resp) => {

}

const server = http.createServer(httpServer);

server.listen(PORT, 'localhost', error => {
    if (error) console.log(`Error to init server `, error);
    console.log(`Server ran on port: ${PORT}`);
});

