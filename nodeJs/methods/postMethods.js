const connectMongo = require('../mongoConnect');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);




async function postMethod(REQ) {
let result
    switch (REQ.path) { 
        case '/register':
            result = await register(REQ);
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

module.exports = postMethod;

async function record(req){
const connection = await connectMongo("learning");
    let data = {
        name: req.body.name,
        email: req.body.email,
        time: new Date().toLocaleDateString() + ':' + new Date().toLocaleTimeString(),
        deleted: false,
    }
    let result = await connection.insertOne(data);
    return  result;
}

async function register(req) {
        const connection_login = await connectMongo('login_Credintials');
    let checkUser = await connection_login.aggregate([{ $match: { id: req.body.id } }]).toArray();
    if (checkUser.length > 0) {
        return 'user already registered';
    }
    else {
        
        let encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        let login_credintial = {
            id: req.body.id,
            password: encryptedPassword,
            createdAt: new Date().toLocaleDateString() + ':' + new Date().toLocaleTimeString(),
            updatedAt: new Date().toLocaleDateString() + ':' + new Date().toLocaleTimeString(),
        }
        let result = await connection_login.insertOne(login_credintial)
        delete result.insertedId;
       return result;
    }
}