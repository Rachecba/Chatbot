///////////////////// A clock //////////////////////////////////////////////////
function addZero(s){
 return  (s.length < 2) ? ("0" + s) : s;
}
export function clock(){
       let date = new Date();
       let time = [date.getHours(), date.getMinutes(), date.getSeconds()]
                  .map(function(s){return addZero(s.toString());})
                  .join(":");
       document.getElementById("time").innerHTML = time
}