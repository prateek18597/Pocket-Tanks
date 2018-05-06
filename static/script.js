var stage;

var grap=new createjs.Graphics();
var view=0;
var canvas;//=document.getElementById("canvas");
var ctx;
//		ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);

var socket = io();
socket.on('message', function(data) {
  console.log(data,socket.id);
});


function init()
{
	stage=new createjs.Stage("canvas");
		// ctx= document.getElementById("canvas").getContext("2d");
		// ctx.setTransform(1, 0, 0, 1, 0, 0);
	
}
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick",tick);

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
var xpeak;
var ypeak;
var peakindex;
var tank1index=0;
var tank2index=0;
var tank1x=0;
var tank1y=0;
var tank2x=0;
var tank2y=0;

function tanks()
{
	var tgraph=new createjs.Graphics();
	tgraph.beginStroke("red");
	tgraph.beginFill("red");
	// tgraph.drawRoundRect()
	var xnum=Math.floor(Math.random()*xcoor.length);
	if(xnum%2==0)
	{
		xnum=xnum/2;
	}
	else
	{
		xnum=(xnum+1)/2;

	}
	xnum=xnum-Math.floor(Math.random()*xnum)+100;
	if(xnum<peakindex)
	{
	tank1index=xnum;
	var xpos=xcoor[xnum];
	var ypos=ycoor[xnum];
	tank1x=xpos-15;
	tank1y=ypos-15;
	tgraph.drawRoundRect(tank1x,tank1y,25,15,5);
	var tank=new createjs.Shape(tgraph);
	// tank.x=
	stage.addChild(tank);
	
	}
	else
	{
		xnum=2*peakindex-xnum;
		tank1index=xnum;
		var xpos=xcoor[xnum];
	var ypos=ycoor[xnum];
	tank1x=xpos-15;
	tank1y=ypos-15;
	tgraph.drawRoundRect(xpos-15,ypos-15,25,15,5);
	var tank=new createjs.Shape(tgraph);
	// tank.x=
	stage.addChild(tank);
	}

	tgraph.endFill();
	tgraph.beginFill("gray");
	
	xnum=Math.floor(Math.random()*xcoor.length);
	
	if(xnum%2==0)
	{
		xnum=xnum/2;
	}
	else
	{
		xnum=(xnum+1)/2;

	}
	xnum=peakindex+xnum-Math.floor(Math.random()*xnum)+20;
	if(xnum>peakindex)
	{
		tank2index=xnum;
		var xpos=xcoor[xnum];
		if(xpos>1000)
		{
			xpos-=xpos/6;
		}
	var ypos=ycoor[xnum];
	tank2x=xpos-15;
	tank2y=ypos-15;
	tgraph.drawRoundRect(xpos-15,ypos-15,25,15,5);
	var tank=new createjs.Shape(tgraph);
	// tank.x=
	stage.addChild(tank);
	
	}
	else
	{
		xnum=2*peakindex-xnum;
		tank2index=xnum;
		var xpos=xcoor[xnum];
	var ypos=ycoor[xnum];
	tank2x=xpos-15;
	tank2y=ypos-15;
	tgraph.drawRoundRect(xpos-15,ypos-15,25,15,5);
	var tank=new createjs.Shape(tgraph);
	// tank.x=
	stage.addChild(tank);
	}
	
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
	// ctx.clearRect(0, 0, this.canvas.width+1, this.canvas.height+1);
	document.getElementById("canvas").style.background="#87cefa";
			grap.clear();
			stage.clear();
			stage.update();
			grap=new createjs.Graphics();
			var shape;
			
			grap.beginStroke("black");
			grap.setStrokeStyle(5);
			grap.moveTo(0,500);
			// graphics.beginFill("green");
			grap.beginLinearGradientFill(["#004d1a","#006622","#00802b","#009933","#00b33c","#33ff77"], [0, 1,0,0,0,0], 0, 620, 0, 50);
			// shape=new createjs.Shape();
			var ranX=Math.random()*(400)+300;
			var y=400;
			var y0=y;
			xcoor.push(-5);
			ycoor.push(400);
			for(var i=-5;i<=ranX;i+=1.5)
			{
				var r=Math.random()*4;
				var j=(r)%2;
				if(ranX-i<200 && j>1)
					r+=3;
				// if(y-r<150 || y-r >500)
				// {
				// 	r=0;
				// }
				if(j>1)
				{
					if(y-r>50){
					grap.quadraticCurveTo(i-1,y0,i,y-r,10);
					y=y-r;
					xcoor.push(i);
					ycoor.push(y);
					}
				}
				else{
					// {	
					if(y+r<400)
					{	grap.quadraticCurveTo(i-1,y0,i,y+r,10);
						y=y+r;
						xcoor.push(i);
					ycoor.push(y);
					}
					// else
					// 	graphics.lineTo(i,y);	
				}
				y0=y;
				peakindex=xcoor.length;
				xpeak=i;
				ypeak=y;
				// y=y-r;
			}
			for(var i=ranX+1;i<=1000;i+=1.5)
			{
				var r=Math.random()*4;
				var j=(r)%2;
				// if(y-r<150 || y-r >500)
				// {
				// 	r=0;
				// }
				if(i-ranX<200 && j>1)
					r+=3;

				if(j>1)
				{
					if(y+r<400){
					grap.quadraticCurveTo(i-1,y0,i,y+r,10);
					y=y+r;
					xcoor.push(i);
					ycoor.push(y);
				}
				}
				else{
					// {	
					// if(i%3==0)
					if(y-r>50){
						grap.quadraticCurveTo(i-1,y0,i,y-r,10);
						y=y-r;
						xcoor.push(i);
					ycoor.push(y);
					}
					// }
					// else
					// 	graphics.lineTo(i,y);	
				}
				y0=y;
				// y=y-r;
			}
			grap.quadraticCurveTo(1000,y0,1400,y0).quadraticCurveTo(1400,y0,1400,650).quadraticCurveTo(1400,450,0,650).quadraticCurveTo(0,650,0,400);
			shape=new createjs.Shape(grap);
			stage.addChild(shape);
			tanks();
			// attack(1);
			backButton();
			stage.update();	
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
		view =-1;
		starter();
	}
	else
	{
		if(view==1)
		{
			view=-1;
			stage.removeAllChildren();
			stage.update();
			terrain();
		}
	}
	// stage.removeChild(ball);
	stage.update();			
}



