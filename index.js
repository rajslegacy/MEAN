const express = require('express');
const bodyParser= require('body-parser');
const app = express();
var session = require('express-session');
var morgan = require('morgan');
var db = require('./server/db/connection');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(morgan('combined'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', bodyParser.json(), function(req, res, next){
    next();
});

app.listen(8080, function() {
  console.log('listening on 3001')
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.get('/list', function(req, res) {
  var cursor = db.getDb().collection('Users').find().toArray(function(err, results) {
    console.log(results);
    res.send(results);
  });
});
app.post('/login', function(req, res) {
    var session = req.session;
    if(session.user){
        res.send(session.user);
        console.log('from session');
    }else{
        db.getDb().collection('Users').find({username : req.body.username}).toArray(function(err, results) {
            if(results){
                if(results[0].password === req.body.password){
                    req.session.user = results[0];
                    res.send(results[0]);
                    console.log('from login');
                }else{
                     res.status(402);
                    res.send(req.body);
                }
            }else{
                res.status(402);
                res.send(req.body);
            }
        });
    }
});
app.post('/register', function(req, res) {
    console.log(req.body);
    db.getDb().collection('Users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database');
    res.send(req.body);
  });
});