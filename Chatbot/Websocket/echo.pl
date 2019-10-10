/*
Socket server
loriacarlos@gmail.com
EIF400 II-2019
Para arrancar (lo hace en puerto 3000)
swipl echo-ws-server
*/


:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/websocket)).
:- use_module(library(http/http_client)).
:- use_module(rsParser).

:- initialization(start_server).

node_endpoint('http://localhost:6000').
%%%%%%%%%%%%%%%%%%%%% Configure handlers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% static files handler
:- http_handler(root(.),
                http_reply_from_files('.', []),
                [prefix])
.
% websocket echo handler
:- http_handler(root(echo), 
                http_upgrade_to_websocket(echo, []),
                [spawn([])])
.

:- http_handler(root(admin), 
                http_upgrade_to_websocket(parsing, []),
                [spawn([])])
.

% returns de bot response to the query
echo(WebSocket) :-
    ws_receive(WebSocket, Message),
    (   Message.opcode == close
    ->  true
    ;   post_msg(Message.data, Reply),
        ws_send(WebSocket, text(Reply)),
        echo(WebSocket)
    )
.

parsing(Request) :-
   ws_receive(Request, Message),
   writeln(Message.data),
   open('output.txt',write, Stream),
   write(Stream, Message.data),
   close(Stream)
   .


post_msg(Msg, Resp) :-
  node_endpoint(NodeEndPoint),
  format(atom(AtomMsg), '{"msg":"~s"}', [Msg]), 
  http_post(NodeEndPoint, atom(AtomMsg), Resp, [])
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Server Control %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
start_server :-
    default_port(Port),
    start_server(Port).
start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).

stop_server() :-
    default_port(Port),
    stop_server(Port).
stop_server(Port) :-
    http_stop_server(Port, []).

default_port(3000).




