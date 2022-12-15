// const http = require('http');
const express = require('express');
<<<<<<< HEAD

const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const getMethods = require('./methods/getMethods');
const postMethod = require('./methods/postMethods');
const putMethods = require('./methods/putMethods');
const deleteMethod = require('./methods/deleteMethod');





const app = express();


// const publicPath = path.join(__dirname, 'project/dist/project');
// app.use(express.static(publicPath))
app.use(bodyParser.json());



app.use(async function (req, res, next) { 
    let result
    switch (req.method) {
        case 'GET':
            result = await getMethods(req);
            break;
        case 'POST':
            result = await postMethod(req);      
            break;
           case 'PUT':
            result = await putMethods(req);      
            break;
        case 'DELETE':
            result = await deleteMethod(req);      
            break;
        default:
            result = 'error';
            break;
    }
    res.send(result);
})
app.listen(5000);


=======
const app = express();
app.get('', (req,resp) => {
    resp.send('This is home page');
});

app.get('/about', (req,resp) => {
    resp.send('This is about page');
})
>>>>>>> ed0aa9e54a5195e28239bd3b3f55400e2f0a8b09

// http.createServer((req, resp) => {
//     resp.write("response");
//     resp.end();
<<<<<<< HEAD
// }).listen(4000);
=======
// }).listen(4000);
app.listen(5000);
>>>>>>> ed0aa9e54a5195e28239bd3b3f55400e2f0a8b09
