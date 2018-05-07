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
app.get('/Game', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
  // getLogin();
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
	host:"localhost",user:"root",password:"1111",database:"PocketTank"
});

// connection.connect(function(err){
// 	if (err) throw err;
// 	console.log("Connection Completed.");
	
// });

var password1="";
var userid1="";
var terr=[];//It contains Location of Terrain coordinates(X coordinate is index of array element,y coordinate is value of array)
var xpeak=0;//It contains x coordinate of peak;
var ypeak=400;//It contains y coordinate of peak;
// var password2="";
// var userid2="";

function createTerrain()
{
	var ranX=Math.random()*400+300;
	terr.push(400);
	var y0=400;
	// var xpeak=0;
	// var ypeak=400;
	for(var i=1;i<=ranX;i+=1)
	{
		var r=Math.random()*8/3;
		var y=400;
		var j=r%2;

		if(ranX-i<200 && j>1)
			r+=3;
		if(j>1)
		{
			if(y-r>50)
			{
				y=y-r;
				terr.push(y);
			}	
		}
		else
		{
			if(y+r<400)
			{
				y=y+r;
				terr.push(y);
			}
		}
		xpeak=i;
		ypeak=y;
	}
	for(var i=ranX+1;i<=1000;i+=1)
	{
		var r=Math.random()*8/3;
		var y=400;
		var j=r%2;

		if(i-ranX<200 && j>1)
			r+=3;
		if(j>1)
		{
			if(y+r<400)
			{
				y=y+r;
				terr.push(y);
			}	
		}
		else
		{
			if(y-r>50)
			{
				y=y-r;
				terr.push(y);
			}
		}
	}
}

createTerrain();

function getLogin()
{
	console.log("GetLogin is working.");
	connection.connect(function(err) {
  	if (err) throw err;
  		connection.query("SELECT * FROM Login", function (err, result, fields) {
    if (err) throw err;
    var str=JSON.stringify(result);
    var json=JSON.parse(str);
    userid1=json[0].id;
    password1=json[0].password;
  });
});
}

// connection.connect(function(err) {
//   	if (err) throw err;

//   	var sql="INSERT INTO Login (id,password) VALUES ('Hello','Bye')";
//   		console.log("Second");
//   		connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Data Inserted.");
//   });
// });	

function setLogin(userid,pswd)
{
	console.log("SetLogin is working.");
	connection.connect(function(err) {
  	var sql="INSERT INTO Login (id,password) VALUES ('"+String(userid)+"','"+String(pswd)+"')";
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
	// setLogin("P","P"); 	
}
);

});




