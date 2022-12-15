// const http = require('http');
const express = require('express');

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



// http.createServer((req, resp) => {
//     resp.write("response");
//     resp.end();
// }).listen(4000);