let bot = new RiveScript();

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

const WS_URI = 'ws://localhost:3000/echo' 
/////////////////////////////////////////////////////////////
let websocket;  
function init_socket(){ // Binds socket events 
    websocket           = new WebSocket(WS_URI);
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = '';
});

function botReply(message){
  message_container.innerHTML += `<div class="bot">${message}</div>`;
  location.href = '#edge';
}

function botReplyResponse(message){
  message_container.innerHTML += `<div class="bot">${message.data}</div>`;
  location.href = '#edge';
}

function selfReply(message){
  message_container.innerHTML += `<div class="self">${message}</div>`;
  location.href = '#edge';
  websocket.send(message);
}

function onClose(evt){ // Handler of close sockect
let message = 'connection is closed';
    message_container.innerHTML += `<div class="self">${message}</div>`;
}

function onMessage(evt){ // Handles socket message
    console.log('Message Arrived');
    console.log(evt)
    // Simulates a bot message
    botReplyResponse(evt);
}

function onError(evt){
    botReply(evt.data);
}

function botReady(){
  bot.sortReplies();
  botReply('Hola');
}

function botNotReady(err){
  console.log("An error has occurred.", err);
}

window.addEventListener("load", init_socket, false);