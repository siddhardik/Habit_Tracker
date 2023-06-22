const mongoose = require('mongoose');

// storing the db on mongo atlas , First Testing with local
const MongoURL = "mongodb+srv://siddharthabhunia2001:6mUZEdhUVCesQXvv@cluster0.hnvkgac.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(MongoURL).then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB [Habbit_Tracker-db] ');
});

module.exports = db;