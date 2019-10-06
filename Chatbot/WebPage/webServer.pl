:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/websocket)).
:- use_module(library(http/http_client)).

:- initialization(start_server).

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

default_port(4500).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Server handlers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%root
:- http_handler(
                    root(.),
                    http_reply_from_files('.', [indexes(['./index.html'])]),
                    [prefix]        
                ).

:- http_handler(
                    css(.),
                    http_reply_from_files('./css', []), 
                    [prefix]
                ).

:- http_handler(
                    js(.),
                    http_reply_from_files('./js', []),
                    [prefix]
                ).

