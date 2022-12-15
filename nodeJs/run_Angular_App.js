const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
/* This is the server that is listening to the port 3000. */
/* Hosting project on port 3000
path.join gives path for reading index.html file nd run it
app.use host that file on server  */
const displayApp = path.join(__dirname, 'project/dist/project');
app.use(express.static(displayApp));
app.get('**', (req, res) => {
    res.sendFile('index.html', { root: displayApp });  
});
app.listen(3000)
