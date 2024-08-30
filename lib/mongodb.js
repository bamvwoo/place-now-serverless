import { mongoose } from "mongoose";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let isConnected = false;

export async function connectToDatabase(dbName) {
    dbName ||= process.env.MONGODB_DATABASE;

    try {
        if (!isConnected) {
            await mongoose.connect(process.env.MONGODB_URI, options);
            isConnected = true;
        }

        const database = mongoose.connection.useDb(dbName);
        return { database };
    } catch (e) {
        console.error('Failed to connect to the database', e);
        throw new Error('Failed to connect to the database');
    }
}