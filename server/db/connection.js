var state = {
    db : null
};

const MongoClient = require('mongodb').MongoClient;
var testDB;
MongoClient.connect('mongodb://localhost:27017/test', (err, database) => {
  state.db = database;
  console.log("Connected to database");
});

exports.getDb = function(){
    return state.db;
} 