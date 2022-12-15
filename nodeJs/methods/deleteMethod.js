const mongodB = require('mongodb');
const connectMongo = require('../mongoConnect');


async function deleteMethod(REQ) {
        let result
    switch (REQ.path) { 
        case '/':
            result = await updateUser(REQ);
            break;
        default:
            if (REQ.params) {
                result = await deleteUser(REQ)
            } else {
                result = {
                    status: 'error',
                }
            }
                break;
                
    }
    return result;
 }


module.exports = deleteMethod;

async function deleteUser(req) {
 const connection = await connectMongo("learning");
    id = req.params.id;
    changes = { "deleted": true };
    //  let result0 = await connection.aggregate([{$match:{"deleted":false} && {_id: new mongodB.ObjectId(id)}}]).toArray();
    // let result = await connection.deleteOne({ _id: new mongodB.ObjectId(id) });
     let result = await connection.updateOne(
        { _id: new mongodB.ObjectId(id) },
        { $set: (changes) })
    return result;
}