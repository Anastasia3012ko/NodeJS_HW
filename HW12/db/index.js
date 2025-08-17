import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_URL;
const DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(URL);

let dbConnection;

async function connectToDataBase() {
    try{
        await client.connect();
        console.log("Connected successfully to mongoDB");
        dbConnection = client.db(DB_NAME);
    }catch(error){
        console.error("Failed to connection to mongoDB", error);
    }
};

function getDb() {
    if(!dbConnection) {
        throw new Error('Database not connected!');
    }
    return dbConnection;
}

export { connectToDataBase, getDb }
