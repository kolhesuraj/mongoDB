const connectMongo = require('../mongoConnect');
const mongodB = require('mongodb');

async function putMethods(REQ) {
    let result
    switch (REQ.path) { 
        case '/':
            result = await updateUser(REQ);
            break;
        default:
            if (REQ.params) {
                result = await updateUser(REQ)
            } else {
                result = {
                    status: 'error',
                }
            }
                break;
                
    }
    return result;
}
module.exports = putMethods;
 
async function updateUser(req){
const connection = await connectMongo("learning");
    const id = req.params.id;
    let result = await connection.updateOne(
        { _id: new mongodB.ObjectId(id) },
        { $set: (req.body) })
    return result;
}