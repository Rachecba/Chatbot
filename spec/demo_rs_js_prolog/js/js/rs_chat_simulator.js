/*
loriacarlos@gmail.com
EIF400 II-2019
*/
import {clock} from './clock.js';
import {init_speech, speek_in, speek_out} from './speech.js';
import {User} from './user.js';
import {Writer} from './writer.js';

///////////////////////// Simulator ////////////////////////////////

let output;      // Div area for appending chat messages 
let clock_timer; // A timer for the clock
let clickme;     //  A button for showing interaction
function init_simulator(){
    clock_timer = setInterval(clock, 10); // Starts clock
        
    output = document.getElementById("output");
    init_writer(output);
    
    init_user();
    init_bot(rivet_file); // starts bot

    clickme = document.getElementById("clickme")
    init_speech()
    clickme.onclick = init_speech

    init_socket();
}
///////////////////////// WebSocket ///////////////////////////////
//const WS_URI = 'ws://html5rocks.websocket.org/echo' 
//const WS_URI = "wss://echo.websocket.org/";
const WS_URI = 'ws://localhost:3000/echo' 
/////////////////////////////////////////////////////////////
let websocket;  
function init_socket(){ // Binds socket events 
    websocket           = new WebSocket(WS_URI);
    websocket.onopen    = function(evt) { onOpen(evt) };
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };
}
function send(message){
    append_line(message, 'blue')
    websocket.send(message);
}
//////////////////// The user /////////////////////////////

let user;
function init_user(){
    user = new User("me-user")
}
//////////////////// The bot //////////////////////////////
let bot;
const rivet_file = "./rivescripts/chat_room.rive"
function init_bot(file){
    function load_done(){
      console.log("Bot has finished loading!");
      bot.sortReplies();
      console.log("Bot is ready for chat");
    }
    function load_fail(err){
       console.log(err)
    }
    // Create bot
    bot = new RiveScript();
    bot.loadFile(file)
       .then(load_done)
       .catch(load_fail)
}

// 
function bot_reply(user_msg){
    if (bot){
        bot.sortReplies();
        return bot.reply(user.name, user_msg.toLowerCase());
    }
    else Promise.resolve('bot is unrechable')
}

////////////////////// Controller ////////////////////////////////////

let send_timer;   // Timer for sending messages periodically

const sending_frequency = 5000;
function onOpen(evt) { // Handler for open socket, starts timer for sending messages
    append_line('Connection is open', 'big green underline');
    send_timer = setInterval(function(){
                                
                                if (user.isTired()){ // Stop sending
                                    let msg = user.byeMessage()
                                    send(msg)
                                    speek_in(msg)
                                    clearInterval(send_timer)
                                    websocket.close();
                                    return
                                }
                                if (websocket.readystate != WebSocket.CLOSED){
                                    let msg = user.yieldMessage();
                                    send(msg);
                                    speek_in(msg)
                                }
                            
                            }
                , sending_frequency)

}
//////////////////// WS Event Handlers ///////////////////////////////
function onClose(evt){ // Handler of close sockect
    append_line('Connection is closed', 'big red underline');
}

function onMessage(evt){ // Handles socket message
    console.log('Message Arrived');
    console.log(evt)
    // Simulates a bot message
    let date = new Date(evt.timeStamp)
    bot_reply(user.lastMessage()) // Returns a Promise!
    .then(function(response){
            insert_line(response, date);
            return response
          })
    .then(function(response){
         speek_out(response)   
    })
    .catch( function(err){
        let response = ` *err* ${err}`
        insert_line(response, date)
        return response;
    })
}
function onError(evt){
    append_line(`Error: {evt.data}`, 'red big');
}
//////////////////// Output functions ////////////////////////////////////
let writer;
function init_writer(output){
    writer = new Writer(output);
}
function insert_line(response, date){
    writer.insert_line(response, date)
}
function append(message){
    writer.append(message);
}
function append_line(message, cls){
    append(line(message, cls));
}
function line(message, cls){
    return writer.line(message, cls);
}
////////////////// Handles load event calling init ///////////////////////////////////////////
window.addEventListener("load", init_simulator, false);
////////////////////////////////////////////