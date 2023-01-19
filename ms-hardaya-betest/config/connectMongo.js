const { MongoClient } = require("mongodb");

// const uri = process.env.MONGODB_URL || "mongodb+srv://ardogible:ardogible@cluster0.nkukl1m.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let dbConnection;

async function connectDB() {
  try {
    await client.connect();
    const dbList = await client.db().admin().listDatabases();
    let exist = false;
    let db;
    dbList.databases.forEach(dbItem => {
      if (dbItem.name === 'db_hardaya_betest') {
        exist = true;
        db = client.db(dbItem.name);
      }
    });
    if (!exist) {
      db = client.db("db_hardaya_betest");
      console.log("db and collection not exist, now creating");
      db.createCollection("Users"); // This line i s important. Unless you create collection you can not see your database in mongodb .

    }
    dbConnection = db;
    return db;


  } catch (error) {
    await client.close();
    console.log(error);
  }
}

function getDB(params) {
  return dbConnection;
}
module.exports = { connectDB, getDB };