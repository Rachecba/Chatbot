/*
loriacarlos@gmail.com
EIF400 II-2019
*/

////////////////////////////// Speech ///////////////////////////////
let available_voices;
// Needs two voices 
const LANG = 'en-US';
let in_english_voice;
let out_english_voice;

export function init_speech(){
     // get all voices that browser offers
    available_voices = window.speechSynthesis.getVoices();
    // find voice by language locale 
    // if not then select the first voice (any)
    console.log("Available voices ", available_voices)
    let i = 0;
    for(; i < available_voices.length; i++) { // Search one voice (input)
        console.log(available_voices[i].lang)
        if(available_voices[i].lang === LANG) {
            console.log("in-voice ", i)
            in_english_voice = available_voices[i];
            i++
            break;
        }
    }
    if( ! in_english_voice)
        in_english_voice = available_voices[0];
        
    for(; i<available_voices.length; i++) { // Search another voice (output)
        console.log(available_voices[i].lang)
        if(available_voices[i].lang === 'en-US') {
            console.log("out-voice ", i)
            out_english_voice = available_voices[i];
            break;
        }
    }
    if( ! out_english_voice)
        out_english_voice = available_voices[1];

}
export function speek_in(text){
    return speek(text, in_english_voice)
}
export function speek_out(text){
    return speek(text, out_english_voice)
}
export function speek(text, voice=in_english_voice){
    if (! voice ){
        console.log('Voice is not available')
        return
    }
    // Configure utterance
    let utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = text
    utter.voice = voice;

    // event after text has been spoken
    utter.onend = function() {
        console.log('Speech has finished');
    }

    // speak
    window.speechSynthesis.speak(utter);
}