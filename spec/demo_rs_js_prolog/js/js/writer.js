/*
loriacarlos@gmail.com
EIF400 II-2019
*/
export class Writer{
    constructor(output){
        this.output = output;
    }
    //////////////////// Output functions ////////////////////////////////////
    insert_line(response, date){
        this.append(this.line(`${response} (after ${date.getSeconds()} sec)`, 'green'))
    }
    append(message){
        let p = document.createElement("p");
        p.innerHTML = message;
        this.output.appendChild(p);
    }

    line(message, cls){
        return `<span class="${cls}"> ${message} </span>`
    }
}