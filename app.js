var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/home2/index.html');
});

app.get('/old', function(req, res){
  res.sendFile(__dirname + '/public/home/index.html');
});

app.get('/3dttt', function(req, res){
  res.sendFile(__dirname + '/public/3DTTT/index.html');
});

app.get('/econsim', function(req, res){
  res.sendFile(__dirname + '/public/econsim/index.html');
});

app.get('/worldess', function(req, res){
  res.sendFile(__dirname + '/public/wordless/index.html');
});


app.get('/time', function(req, res){
  res.sendFile(__dirname + '/public/time/index.html');
});

app.get('/bases', function(req, res){
  res.sendFile(__dirname + '/public/bases/index.html');
});


app.listen(3000, function(){
  console.log('listening on *:3000');
});
