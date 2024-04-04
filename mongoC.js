import { MongoClient } from 'mongodb';

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://admin:${password}@cluster0.0jxjv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString);
let conn;

try{
    conn = await client.connect();
    console.log("MongoDB Connected");
}catch(e){
    console.error(e);
}
let db = client.db("nodeexpressdb");
export default db;