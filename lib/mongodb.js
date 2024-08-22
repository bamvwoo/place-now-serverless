import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

export async function connectToDatabase() {
    if (mongoClient && database) {
        return { mongoClient, database };
    }
    try {
        mongoClient = await (new MongoClient(uri, options)).connect();
        database = await mongoClient.db(process.env.MONGODB_DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error('Failed to connect to the database', e);
        throw new Error('Failed to connect to the database');
    }
}