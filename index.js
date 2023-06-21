// require express
const express = require('express');
const app = express();  // Create a instance of expressCLass
const port = 8000;

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// require connect-flash to show Flash Message
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

// used for session cookies sign in auto Features in a define timeout
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

// const cookieParser = require('cookie-parser');
// app.use(express.urlencoded());
// app.use(cookieParser());

// layouts for ejs
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:false}));
// parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets')); 

//mongo store is used to store the session cookie
app.use(session({
    name: 'Habit_Tracker',
    secret: 'Hurray',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
           // Mongo Atlas URL should be given instaead of local
            mongoUrl: "mongodb://127.0.0.1:27017/Habbit_Tracker-db" ,
            autoRemover : 'disabled'
        },
        function(err){
            console.log(err||'connect-mongo-db/Cloud Atlas');
        }
    ),
}));

// Using passport  for secure Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash middleware to show flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

// use express router for specific routing
app.use('/', require('./routes'));

// directing the app in the given port
app.listen(port, function(err) {
    if(err) {
        console.log('Error : ', err);
        return;
    }
    console.log(`Server is running on port : ${port}`);

});