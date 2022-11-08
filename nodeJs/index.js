// const http = require('http');
const express = require('express');
const app = express();
app.get('', (req,resp) => {
    resp.send('This is home page');
});

app.get('/about', (req,resp) => {
    resp.send('This is about page');
})

// http.createServer((req, resp) => {
//     resp.write("response");
//     resp.end();
// }).listen(4000);
app.listen(5000);