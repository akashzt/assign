var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');
const http = require('http');
var usersRouter = require('./routes/user');
//import database
const db=require("./util/db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', usersRouter);
// Define a route to render your EJS template
app.get('/', (req, res) => {
  res.render('login', { error: null }); 
});
app.get('/register', (req, res) => {
  res.render('register', { error: null }); 
});
app.get('/profile',(req,res)=>{
  res.render('profile', { error: null }); 
})
app.get('/chats/:grievanceId',(req,res)=>{
  res.render('chat', { error: null }); 
})
const wss = new WebSocket.Server({  port: 8080 });
// Object to store connected clients mapped by grievanceId
const clients = {};

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Handle incoming messages
  ws.on('message', function incoming(message) {
    try {
      const messageObj = JSON.parse(message);
      const grievanceId = messageObj.grievanceId;

      // Store client connection based on grievanceId
      if (!clients[grievanceId]) {
        clients[grievanceId] = [];
      }
      clients[grievanceId].push(ws);

      // Broadcast message to all clients connected to this grievanceId
      clients[grievanceId].forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
});
db();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
