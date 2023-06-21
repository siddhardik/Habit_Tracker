const mongoose = require('mongoose');

// storing the db on mongo atlas , First Testing with local
const DB = "mongodb://127.0.0.1:27017/Habbit_Tracker-db";


mongoose.connect(DB).then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB [Habbit_Tracker-db] ');
});

module.exports = db;