var express = require('express');
var app = express();
var User = ("./rewards/User.js");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/home2/index.html');
});

app.get('/old', function(req, res){
  res.sendFile(__dirname + '/public/home/index.html');
});

app.get("/rewards/user", function(req, res) {
  res.sendFile(__dirname + '/rewards/user.json')
  (new User).generate();
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});
