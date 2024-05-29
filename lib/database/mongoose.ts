// Inside this file we make the connection to the mongoose mongodb database
import mongoose, { Mongoose } from 'mongoose';

//Setup the URL as a variable
const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

/*In NextJs, you have to call the connection on each server action or API request we do
This is because NextJs runs in a serverless environment
Serverless functions are stateless because they start up to 
handle a request and shut down right after without maintaining a continuous
connection to databases*/

//caching the connections
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) { 
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}
//Optimization
export const connectToDatabase = async () => {
    //if there is a cached promise of a connection
    if (cached.conn) return cached.conn;

    //MONGODB_URL not defined
    if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

    //if there is not cached promise of a connection
    cached.promise =
        cached.promise ||
        mongoose.connect(
        MONGODB_URL,
        {
            dbName: 'picturifyAI', bufferCommands: false 
            
            })
    
    //Once we have the promise it will result into a connection
    cached.conn = await cached.promise;

    return cached.conn

}





