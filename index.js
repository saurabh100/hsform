var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var config = {
    "port": 8080
};


var commonRoutes = require('./routes');
var app = express();

app.use(cors({
    origin: function (origin, callback) {
        callback(null, origin);
    },
    credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, './public'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

app.get('/test', (req, res) => {
    res.send("dsdhf");
});
app.use('/api', commonRoutes);


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

process.on('exit', function () {
    // process.emit('cleanup');

    console.log("--------------Process exit unusual----------------");

});
process.on('uncaughtException', function (e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});

app.listen(config.port);
console.log("Server started at port: ", config.port);
console.log("browse to URL: http://localhost:8080");

module.exports = app;
