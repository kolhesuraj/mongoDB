const http = require('http');

http.createServer((req, resp) => {
    resp.write("response");
    resp.end();
}).listen(4000);
