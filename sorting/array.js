var div1=document.getElementById("div1");
var div=document.createElement("div");
div.className+="container-fluid";
div1.appendChild(div);
var div2=document.createElement("div");
div.appendChild(div2);
div2.className+="row justify-content-center";
div2.id="bars";




var num_original=document.getElementById("size").value;

var num_size=document.getElementById("size").value;
var speed=document.getElementById("speed").value;
var s=document.getElementById("size");
var ss=document.getElementById("speed");
var ns=document.getElementById("size");
s.addEventListener("input",update);
ss.addEventListener("input",update1);
function update1(){
    speed=document.getElementById("speed").value;
}
function update(){
    num_size=document.getElementById("size").value;
    speed=document.getElementById("speed").value;
    generate1();
}


var x=document.getElementById("bars");
x.style="flex-direction:row";

var ar_size=document.getElementById("size");

// console.log(num_size);



//  for(let i=0;i<num_size;i++){
//     var height=Math.floor(500*Math.random())+20;
//     var y=document.createElement("div");
//     var margin_size=0.1;
//     y.style=style=`border-left: 15px solid blue;height:${height}px; margin: 6px;margin-top:50px`;
//     x.appendChild(y); 
//  }

var new_array=document.getElementById("new");
new_array.addEventListener("click",generate);


function generate(){
    x.innerHTML="";
    document.getElementById("size").value=num_original;

    for(let i=0;i<num_original;i++){
        var height=Math.floor(300*Math.random())+20;
        var y=document.createElement("div");
        y.style=`border-left: 5px solid blue;height:${height}px; margin: 2px;margin-top:50px`;
        x.appendChild(y); 
     }
}



function generate1(){
    x.innerHTML="";

    for(let i=0;i<num_size;i++){
        var height=Math.floor(300*Math.random())+20;
        var y=document.createElement("div");
        y.style=`border-left: 5px solid blue;height:${height}px; margin: 2px;margin-top:50px`;
        x.appendChild(y); 
     }
}
