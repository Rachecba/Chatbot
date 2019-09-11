/*
loriacarlos@gmail.com
EIF400 II-2019
*/

function rand(min, max) { // Util function for generating random beetween min and max
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
}
export class User{
    constructor(name='user', sending=6){
        this.name = name
        this.sending = sending; // Max number of messages to be sent
        this.in_messages = [ // User random messsages
        
                 "How are you?",  
                 "Anybody there?", 
                 "Where are you?", 
                 "How old are you?", 
                 "Are you alone?",
                 "You sound bored"
        ];
        this.message_num = 0
    }
    yieldMessage(){
        this.message_num = rand(0, this.in_messages.length)
        this.sending--;
        return this.in_messages[this.message_num]
    }
    lastMessage(){
        return this.in_messages[this.message_num]
    }
    isTired(){
        return this.sending <= 0;
    }
    byeMessage(){
        return "Tired...Leaving";
    }
}