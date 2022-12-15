const connectMongo = require('../mongoConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequerityKey = 'sequreApiCalls'



async function getMethods(REQ) {
let result
    switch (REQ.path) { 
        case '/login':
            result = await login(REQ);
            break;
        case '/':
            result = await learning(REQ);
            // console.log(result);
            break;
        case '/record':
            result = await record(REQ);
            break;
        default:
            result = {
                status: 'error',
            }
            break;
    }
    return result;
   
}
module.exports = getMethods;

async function login(req) {
    const connection_login = await connectMongo('login_Credintials');
    // console.log(req.body);

    let result = await connection_login.find({ id: req.body.id }).toArray();
    console.log(result);
    let decryptedData = bcrypt.compareSync(req.body.password, result[0].password);
    if (decryptedData) {
        delete result[0].password;
        let token = jwt.sign(result[0], sequerityKey, { expiresIn: '24H' });
        
        delete result[0].id;
        return { user: result[0], token: token };
    } else {
        return ('Pleasee enter valid email and password');
    }
}
async function learning(req) {
let result
   let token =  verifyToekn(req);
    const connection = await connectMongo("learning");
   result =  await jwt.verify(token, sequerityKey, async (err, data) => {
       if (err) {
          return err;
       } else if (data) {
        //    console.log(data)
            return await connection.find().toArray();
        }
    })
    return  result;
   
}

async function record(req) {
    let result
      let token =  verifyToekn(req);
    const connection = await connectMongo("learning");
    // let result = await connection.find().toArray();
     result =  await jwt.verify(token, sequerityKey, async (err, data) => {
       if (err) {
          return err;
       } else if(data){
            return  await connection.aggregate([{$match:{"deleted":false}}]).toArray();
        }
    })
   
    return result
 }

function verifyToekn(req) {
    let headers = req.headers.authorization;
    if (typeof header !== undefined) {
        let header = headers.split(" ")[2]; 
        return header
    }
 }