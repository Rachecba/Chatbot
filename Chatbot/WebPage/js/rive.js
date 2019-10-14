/* 
    Nombre: Rachel Basulto Arzola
            Ramson Gu Wu 
            Sergio Jimenez Madrigal
            Antony Oviedo Alfaro
    Grupo # 2
    Horario: 1pm
*/
let bot = new RiveScript();
const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');
const text_box = document.querySelector('textarea');
const WS_URI = 'ws://localhost:3000/echo' 
const WS_URIADMIN = 'ws://localhost:3000/admin' 
/////////////////////////////////////////////////////////////
let websocket;  
let websocketAdmin; 

function init_socket(){ // Binds socket events 
    websocket           = new WebSocket(WS_URI);
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };
} 
function init_socketAdmin(){ // Binds socket events 
    websocketAdmin           = new WebSocket(WS_URIADMIN);
    websocketAdmin.onclose   = function(evt) { onClose(evt) };
    websocketAdmin.onmessage = function(evt) { onMessageAdmin(evt) };
    websocketAdmin.onerror   = function(evt) { onError(evt) };
}

    function openPage(evt, page) {
        socketHandler(page);
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(page).style.display = "block";
        evt.currentTarget.className += " active";
        }
        
        function socketHandler(page){
            if(page === 'chatBot'){
                if(websocketAdmin)
                    websocketAdmin.close();
                init_socket();
            }
            else{
                websocket.close();
                init_socketAdmin();
            }
        }

function init(){
    websocket = new WebSocket(WS_URI);  
    websocketAdmin = new WebSocket(WS_URIADMIN); 
    document.getElementById("defaultOpen").click();
    init_socket();
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

function SendRiveFile(){
    websocketAdmin.send(text_box.value);
    text_box.value = '';
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

function onMessageAdmin(evt){ // Handles socket message
    console.log('Message Arrived');
    console.log(evt)
    // Simulates a bot message
    checkMessage(evt);
}

function checkMessage(message){
    if(message.data === 'ok') {
        alert('Archivo parseado y guardado con éxito')
    }
    else {
        alert('Archivo no pudo ser parseado')
    }
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

window.addEventListener("load", init, false);