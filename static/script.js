var stage;

var grap=new createjs.Graphics();
var view=-1;
var canvas;//=document.getElementById("canvas");
var ctx;
var terr=[];
var xpeak;
var ypeak;
var tank1x=0;
var tank1y=0;
var tank2x=0;
var tank2y=0;//		ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);

var socket = io();
socket.on('message', function(data) {
  console.log(data,socket.id);
});
var modal;

function init()
{
	stage=new createjs.Stage("canvas");
		// ctx= document.getElementById("canvas").getContext("2d");
		// ctx.setTransform(1, 0, 0, 1, 0, 0);
	modal = document.getElementById('id01');
	socket.emit("getTerrain",1);
	
	// console.log(terr);

}
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick",tick);

socket.on('Terrain',function(data){
		terr=data.terrain;
		xpeak=data.x;
		ypeak=data.y;
		tank1x=data.t1x;
		tank1y=data.t1y;
		tank2x=data.t2x;
		tank2y=data.t2y;
		console.log(terr);
	} );

function loginView()
{
	var text = new createjs.Text("Pocket Tanks", "120px Script", "white");
	// document.getElementById("canvas").style.background="white";
 	text.x=(stage.canvas.width-640)/2;
 	text.y=250;
 	text.textBaseline = "alphabetic";
 	stage.addChild(text);
 	stage.update();
 	console.log("loginView");
}



function checkDatabase()
{
	var id=document.getElementById("username").value;
	var pswd=document.getElementById("password").value;
	var up={username:id,password:pswd};
	socket.emit('login',up);
}

function starter()
{
	// ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);
	grap=new createjs.Graphics();
	grap.beginStroke("red");
	grap.beginFill("Blue");
	document.getElementById("canvas").style.background="black";
	grap.drawRoundRect((stage.canvas.width-300)/2,(stage.canvas.height+50)/2,300,100,50);
	
	var s=new createjs.Shape(grap);
	s.name="Play Button";
	grap.endFill();
	stage.addChild(s);
	grap.beginStroke("black");
	grap.beginFill("red");
	grap.drawCircle(100,380,30);
	
	var s2=new createjs.Shape(grap);
	s2.name="Option Button";
	grap.endFill();
	stage.addChild(s2);
	grap.beginStroke("black");
	grap.beginFill("red");
	grap.drawCircle(900,380,30);
	
	var s1=new createjs.Shape(grap);
	s1.name="About Button";
	grap.endFill();
	stage.addChild(s1);
	
	var text = new createjs.Text("Pocket Tanks", "60px Script", "white");
 	text.x=(stage.canvas.width-310)/2;
 	// text.y=180;
 	text.textBaseline = "alphabetic";
 	stage.addChild(text);
 	createjs.Tween.get(text).to({y:180}, 2000, createjs.Ease.linear).to({y:150}, 500, createjs.Ease.linear).to({y:180}, 800, createjs.Ease.linear);
 	text = new createjs.Text("Play", "35px Script", "black");
 	text.x=(stage.canvas.width-60)/2;
 	text.y=(stage.canvas.height+150)/2;
 	text.textBaseline = "alphabetic";
 	stage.addChild(text);
	
	s.addEventListener('click', function (e) {
	console.log(e.target + ' was double clicked!');
	view=1;
	grap.clear();

	// stage.clear();
	// terrain();
});
	
// 	s1.addEventListener('dblclick', function (e) {
// 	console.log(e.target + ' was double clicked!');
// 	view=2;
// });
	
// 	s2.addEventListener('dblclick', function (e) {
// 	console.log(e.target + ' was double clicked!');
// 	view=3;
// });
	
}
createjs.MotionGuidePlugin.install();
var xcoor=[];
var ycoor=[];
// var xpeak;
// var ypeak;
// var peakindex;
// var tank1index=0;
// var tank2index=0;

var slope1=0;
function tanks()
{
	console.log(tank1x+"T1x"+tank1y+"T1y"+tank2x+"T2x"+tank2y+"T2y");
	var tgraph=new createjs.Graphics();
	tgraph.beginStroke("red");
	tgraph.beginFill("red");
	tgraph.drawRoundRect(tank1x,tank1y-15,25,15,5);
	var tank=new createjs.Shape(tgraph);
	// tank.regX=tank1x+12.5;
	// tank.regY=tank1y+7.5;
	slope1=(terr[tank1x+10]-terr[tank1x-10])/20.0;
	slope1=Math.floor(Math.atan(slope1)*180/3.14);
	// tank.rotation=slope1;
	stage.addChild(tank);
	tgraph=new createjs.Graphics();
	tgraph.beginStroke("red");
	tgraph.beginFill("red");
	tgraph.drawRoundRect(tank2x,tank2y-15,25,15,5);
	tank=new createjs.Shape(tgraph);
	slope1=(terr[tank2x+10]-terr[tank2x-10])/20.0;
	slope1=Math.floor(Math.atan(slope1)*180/3.14);
	// tank.rotation=slope1;
	// tank.rotation(Math.atan(slope1));
	stage.addChild(tank);
	stage.update();
	
	
}

function backButton()
{
	var btn=new createjs.Shape();
	btn.graphics.beginFill("black");
	btn.graphics.drawCircle(950,50,20);
	stage.addChild(btn);
	btn.addEventListener('click', function (e) {
	console.log(e.target + ' was double clicked!');
	view=0;
	tank2x=tank1y=tank1x=tank2y=0;
	// grap.clear();

	// stage.clear();
	// terrain();
});

}

function controller()
{

}

function attackMotion(i)
{

}
var power=0;
var angle=0;





socket.on('bpress2',function(data){attack(1);} );

socket.on('loginResponse',function(data){
	console.log(data);
	if(data.result)
	{
		// console.log("")
		view=0;
		console.log("Hello");
		modal.style.display="none";
		
		
	}
	else
	{
		alert("Wrong Credentials Found. Try Again.");
		document.getElementById("username").value="";
		document.getElementById("password").value="";
	}

});


var first = 1;
function attack(i)
{	
	if(first ==1)
	{	first++;
		socket.emit('bpress',1);

	}	
	if(i==1)
	{
		power=document.getElementById("power").value;
		angle=document.getElementById("angle").value;
		console.log(power);
		console.log("Angle is "+angle);
		var ball = new createjs.Shape();
		ball.graphics.beginFill("black");
		ball.graphics.drawCircle(tank1x,tank1y,5);
		// ball.x=tank1x;
		// ball.y=tank1y;
		console.log("Attacked");
		var time=Math.abs(2*power*Math.sin(3.14*angle/180)/10);
		var height=power*power*Math.sin(3.14*angle/180)*Math.sin(3.14*angle/180)/(20);
		var range=power*power*Math.sin(3.14*angle/180)/10;
		console.log(height);
		console.log(range);
		

		createjs.Tween.get(ball).to({guide:{ path:[0,0, range/2,-height, range,0] }},time*100);
		// createjs.Tween.get(ball).to({guide:{ path:[0,0,(tank2x-tank1x)/2,-200,tank2x-tank1x,tank2y-tank1y] }},7000);
			// graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
		// createjs.Tween.get(ball).to({x:(Math.abs(tank1x)),y:Math.abs(tank2y)}, 2000, createjs.Ease.quadIn);

		stage.addChild(ball);
		// for(var i=tank1x;i<tank2index;i++)
		// {
			
		// }
		stage.update();	
	}

	else
	{
		power=document.getElementById("power").value;
		angle=document.getElementById("angle").value;
		console.log(power);
		angle=-angle;
		console.log("Angle is "+angle);
		var ball=new createjs.Shape();
		ball.graphics.beginFill("black");
		ball.graphics.drawCircle(tank2x,tank2y,5);
		// ball.x=tank1x;
		// ball.y=tank1y;
		console.log("Attacked");
		var time=Math.abs(2*power*Math.sin(3.14*angle/180)/10);
		var height=power*power*Math.sin(3.14*angle/180)*Math.sin(3.14*angle/180)/(20);
		var range=power*power*Math.sin(3.14*angle/180)/10;
		console.log(height);
		console.log(range);
		

		createjs.Tween.get(ball).to({guide:{ path:[0,0, range/2,-height, range,0] }},time*1000);
		// createjs.Tween.get(ball).to({guide:{ path:[0,0,(tank2x-tank1x)/2,-200,tank2x-tank1x,tank2y-tank1y] }},7000);
			// graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
		// createjs.Tween.get(ball).to({x:(Math.abs(tank1x)),y:Math.abs(tank2y)}, 2000, createjs.Ease.quadIn);

		stage.addChild(ball);
		// for(var i=tank1x;i<tank2index;i++)
		// {
			
		// }
		stage.update();
		// stage.removeChild(ball);	
	}
}

function terrain()
{
			document.getElementById("canvas").style.background="#87cefa";
			grap.clear();
			stage.clear();
			stage.update();
			grap=new createjs.Graphics();
			var shape;
			grap.moveTo(0,500);
			grap.beginLinearGradientFill(["#004d1a","#33ff77"], [0, 1], 0, 620, 0, 50);
			 
			for(var i=0;i<1000;i+=2)
			{
				grap.quadraticCurveTo(i,terr[i],i+2,terr[i+2]);
			}
			grap.quadraticCurveTo(1000,terr[999],1000,500).quadraticCurveTo(1000,500,0,500);//.quadraticCurveTo(1400,450,0,650).quadraticCurveTo(0,650,0,400);
			console.log(terr[800]);
			shape=new createjs.Shape(grap);
			stage.addChild(shape);
			
			// attack(1);
			backButton();
			stage.update();	
			tanks();
			// stage.update();

}

function mainmenu()
{

}

function tick()
{

	if(view==0)
	{
		stage.removeAllChildren();
		view =-2;
		starter();
	}
	else
	{
		if(view==1)
		{
			view=-2;
			stage.removeAllChildren();
			stage.update();
			terrain();
		}
		else
		{
			if(view==-1)
			{
				loginView();
				stage.update();
				view=-2;
			}
		}
	}
	// stage.removeChild(ball);
	stage.update();			
}



