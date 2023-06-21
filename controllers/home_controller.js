// const Post = require('../models/post');
const User = require('../models/user');  // Need to delete this line 
const Habit = require('../models/habit');


// this function takes user to home
module.exports.home = async function(req, res) {
    if(req.user){
        // If User logged in then fetch his/her habits
        let habits = await Habit.find({user: req.user._id}); 
        
        
        return res.render('home', {
            title : "Habit Tracker",
            habits : habits,
            weeklyDates : await getOneWeekDate()
        })
    }else{
        return res.render('home', {
            title: "Home"
        });
    }
}

// This function provides  the 7days date current date and last 6 days, which will be displayed after the habit is created.
function getOneWeekDate(){
    let months = ["Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for(let i = 6; i>=0 ; i--){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        let mm = currentDate.getMonth()+1;
        mm = months[mm-1];
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        dates.push(mm +" " +dd);
    }
    return dates;
}


module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}