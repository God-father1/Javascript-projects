const container = document.getElementById('container');
const text = document.getElementById('text');
const con=document.getElementById('con');
const audio=document.getElementById("audio");

const totalTime = 7500;
let c=0;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
text.innerText="Let's start."

let t=setInterval(()=> {
  var limit=document.getElementById("min").value;
  limit=limit*60000;
  console.log(limit);
  const n=limit/totalTime;
  audio.play();
  if(c<n){
  text.innerText = 'Breathe In!';
  container.className = 'container grow';
  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
  c=c+1;}
  else{
    clearInterval(t);
    con.innerText="WOW...You did it!";
    audio.pause();
  }
},totalTime);
