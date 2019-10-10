/* 
    Nombre: Ramson Gu Wu 
    Id: 207440006 
    Grupo # 2
    Horario: 1pm
*/
:- module(rsEmiter, [
                       genCodeToFile/2,
                       genCode/1,
                       genCode/2
                    ]).


testEmiter :-
    testParser(P),
    genCode(P)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
genCodeToFile(File, RS_Prog) :-
   writeln(RS_Prog  ),nl,
   open(File, write, Out),
   genCode(Out, RS_Prog),
   close(Out)
.
genCode(P) :- genCode(user_output, P)
.
genCode(Out, rsProg(L)) :- !,
    get_time(TS), 
    format_time(atom(T), '*** Rive Program *** : Generated at: %d/%m/%y %H:%M:%S', TS),
    
    genCode(Out, comment(T)), 
    
    genCodeList(Out, L)
.
genCode(Out, trigger_block(T)) :- !,
    nl(Out),
    genCode(Out, comment('>>> Trigger Block')),
    genCodeList(Out, T)
.
genCode(Out, trigger(WL)) :- !,
    format(Out, '+ ', []),
    genCodeList(Out, WL),
    nl(Out)
.

genCode(Out, response_block(T)) :- !, 
    nl(Out), 
    genCode(Out, T)
.
genCode(Out, response(WL)) :- !, 
    format(Out, '- ', []),
    genCodeList(Out, WL), 
    nl(Out)
.

genCode(Out, trigger_token_list(WL)) :- !,
    genCodeList(Out, WL), 
    nl(Out)
.

genCode(Out, trigger_token(WL)) :- !,
    genCodeList(Out, WL), 
    nl(Out)
.

genCode(Out, wild_card(WL)) :- !, 
    genCodeList(Out, WL), 
    nl(Out)
.

genCode(Out, hash(N)) :- !,
    format(Out, '# ', [N])
.

genCode(Out, star(N)) :- !,
    format(Out, '* ', [N])
.

genCode(Out, underscore(_)) :- !, 
   format(Out, '_ ', [])
.

genCode(Out, weight(N)) :- !,
    format(Out,'{~s=~a} ',[weight,N])
.

genCode(Out, input(1)) :- !,
    format(Out,'<~s> ',[input])
.

genCode(Out, input(N)) :- !,
    format(Out,'<~s~a> ',[input,N])
.

genCode(Out, array(ref, word(W))) :- !, 
    format(Out, '(@~a) ', [W])
.
genCode(Out, array(inline, WL)) :- !,
    format(Out, '( ', []),
    genPipeCodeList(Out, WL),
    format(Out, ') ', [])
.

genCode(Out, define_block(T)) :- !,
    nl(Out),
    genCode(Out, comment('>>> Define Block')),
    genCode(Out, T)
.

genCode(Out, define(WL)) :- !,
    format(Out, '! version = ~', WL),
    genCode(Out, WL),
    nl(Out)
.

genCode(Out, word(N)) :- !, genCode(Out, atom(N))
.
genCode(Out, id(N)) :- !, genCode(Out, atom(N))
.
genCode(Out, num(N))  :- !, genCode(Out, atom(N))
.
genCode(Out, oper(N)) :- !, genCode(Out, atom(N))
.
genCode(Out, set(I, E)) :-  !,
   genCode(Out, operation(oper('='), I, E))
   
.
% Internal Representations
genCode(Out, operation(O, L, R)) :- !,
    genCodeList(Out, [L, O, R])
.
genCode(Out, atom(N)) :- !, format(Out, '~a ', [N])
.
genCode(Out, comment(C)):-
     format(Out, '// ~a \n', [C])
.
%%%% Error case %%%%%%%%%%%%%%%%%%%%%%%%%%
genCode(Out, E ) :- close(Out),!,
                    throw(genCode('genCode unhandled Tree', E))
.

genCodeList(Out, L) :- genCodeList(Out, L, '')
.
genCodeList(_, [], _).
genCodeList(Out, [C], _) :- genCode(Out, C).
genCodeList(Out, [X, Y | L], Sep) :- genCode(Out, X), 
                                     format(Out, '~a', [Sep]),
                                     genCodeList(Out, [Y | L], Sep)
.

genPipeCodeList(Out, L) :- genPipeCodeList(Out, L, '|')
.
genPipeCodeList(_, [], _).
genPipeCodeList(Out, [C], _) :- genCode(Out, C).
genPipeCodeList(Out, [X, Y | L], Sep) :- genCode(Out, X), 
                                     format(Out, '~a', [Sep]),
                                     genPipeCodeList(Out, [Y | L], Sep)
.
