import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = process.env.ATLAS_URI || ""

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("test").command({ ping: 1 });
  console.log('Connected to MongoDB');
} catch (e) {
  console.error(e);
}

let db = client.db("test");

export default db;
