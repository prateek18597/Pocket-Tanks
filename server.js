// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var mysql=require('mysql');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
  getLogin();
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);

var connection=mysql.createConnection(
{
	host:"localhost",user:"root",password:"8p16ff0015",database:"PocketTank"
});


var password1="";
var userid1="";

function getLogin()
{
	console.log("GetLogin is working.");
	
	connection.connect(function(err) {
  	// if (err) throw err;
  		connection.query("SELECT * FROM Login", function (err, result, fields) {
    
    // if (err) throw err;
    var str=JSON.stringify(result);
    var json=JSON.parse(str);
    userid1=json[0].id;
    password1=json[0].password;
    console.log(userid1);

  });

});

}

function setLogin(userid,pswd)
{
	console.log("SetLogin is working.");
	connection.connect(function(err) {
  	if (err) throw err;

  	var sql="INSERT INTO Login (id,password) VALUES ("+String(userid)+","+String(pswd)+")";
  		console.log("Second");
  		connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Data Inserted.");
  
  });
});	
}




io.on('connection', function(socket) {
  socket.on('bpress', function(data) {
    
 	socket.broadcast.emit('bpress2', data);
 	getLogin();
}
);

socket.on('login',function(data){


});

});




