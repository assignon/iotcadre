
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
const port = process.env.PORT || 8080;
var server = require('http').Server(app);

//view engine

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));



var datas = {name: "yanick", age: 22, languague: "French"}

app.get('/', function(req, res){

   res.render('home');

});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket, pseudo){

  /* socket.on('newuser', function(pseudo){

      socket.pseudo = pseudo;
      socket.broadcast.emit('newUser', pseudo);

   });


   socket.on('msg', function(msg)
   {

     socket.broadcast.emit('msgs', {pseudo: socket.pseudo, msg: msg});
     //io.emit('msgs', {pseudo: socket.pseudo, msg: msg});

   });*/

   socket.on('sendImgSrc', function(src){

      socket.broadcast.emit('broadcastImg', src);
      io.emit('broadcastImg', src);

   })


});

server.listen(port);

/*var http = require("http");
var fs = require('fs');

var server = http.createServer(function(req, res)
{

   fs.readFile('views/index.html', 'utf-8', function(error, content){

      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(content);

   });

});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

   console.log("la connection avec socket.io c est etabli");

});

server.listen(3000);*/
