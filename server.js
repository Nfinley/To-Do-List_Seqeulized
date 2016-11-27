/* Server.js file for the To-Do-List-App HW assignment
    Created by: Nigel Finley for the UT BOOTCAMP class
    Date of creation: October 30th, 2016
    Purpose: This files sets up the server and the view engine
 */

// ==== DEPENDENCIES ======
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// ====== SETTING UP THE EXPRESS APP ========
var app = express();
// var PORT = process.env.PORT || 3000;

// ======view engine setup=======
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// ======== Sets up the EXpress app to handle data parsing =======
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public/'));
app.use(methodOverride('_method'));


// ==== Routes using express.Router =====
var controller = require('./controllers/todo_controller');
app.use('/', controller);



//==== Test content to get server up and running ======

var http    = require('http');
var db = require('./models');
app.set('port', process.env.PORT || 3000);


// // development only
// if ('development' === app.get('env')) {
//     app.use(express.errorHandler());
// }

db.sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});



// Starts the server to begin listening
// =============================================================
// app.listen(PORT, function(err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log('App listening on PORT ' + PORT);
// });

module.exports = app;




