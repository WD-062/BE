import http from 'http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello, world!\n');
});

const port = 3000;

server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
);
