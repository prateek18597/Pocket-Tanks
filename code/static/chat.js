// Make connection
var socket = io();
var message,handle,output;
// Query DOM
// var 

message = document.getElementById('message'),
handle = document.getElementById('handle'),
      // btn = document.getElementById('send'),
output = document.getElementById('output');


// Emit events
function chatwork() {
  console.log('chatting');	
  socket.emit('chat', {

      message: message.value,
      handle: handle.value
  });
  message.value = "";
}

// Listen for events
socket.on('chat', function(data){
    console.log("CHAT");
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});