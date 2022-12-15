const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = 'test'
const client = new MongoClient(url);

async function connectMongo(collection) {
    // Use connect method to connect to the server

    let connection = await client.connect();

    let database = connection.db(databaseName);
    return database.collection(collection);
}

module.exports = connectMongo;