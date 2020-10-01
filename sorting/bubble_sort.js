var a =document.getElementById("bubble");
a.addEventListener("click",func);
function func(){
    arr=[]
    arr_sizes=[]
    bar=document.getElementById("bars").querySelectorAll("div");
    for(let i=0;i<bar.length;i++){
        arr.push((bar[i].style['height'].slice(0,bar[i].style['height'].length-2)));

    }

    b=[];
    for(let i=0;i<bar.length;i++){
        b.push(parseInt(arr[i]));
        arr[i]+="px";
    }
    // for(let i=0;i<bar.length;i++){
    //     console.log(b[i]);
    // }

function fun1(arr,j,bar){
    bar[j].style['border-left']="5px solid green";
    bar[j+1].style['border-left']="5px solid red";
}

function fun(arr,j,bar){
    var temp=arr[j];
    arr[j]=arr[j+1];
    arr[j+1]=temp;
    bar[j].style.height=arr[j];
    bar[j+1].style.height=arr[j+1];
    bar[j].style['border-left']="5px solid blue";
    bar[j+1].style['border-left']="5px solid blue";
}    
    
function fun3(arr,j,bar){
    bar[j].style['border-left']="5px solid yellow";
}


var len = b.length,
        i, j, stop;
    var adder = 0;
    var del=Math.floor((20000/Math.floor(speed)));
    for (i=0; i < len; i++){
    
        for (j=0, stop=len-i; j < stop; j++){
           
            if (b[j] > b[j+1]){
                var temp1=b[j];
                b[j]=b[j+1];
                b[j+1]=temp1;
                adder+=del/3;
                setTimeout(fun1,adder,arr,j,bar);
                adder+=del/3;
                setTimeout(fun,adder,arr,j,bar);
                
            }
            
        }
        adder+=del/3;
        setTimeout(fun3,adder,arr,len-1-i,bar);
    }

        
    
}