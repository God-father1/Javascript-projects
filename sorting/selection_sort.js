var a =document.getElementById("selection");
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

    function fun1(arr,i,min_idx){
        bar[i].style['border-left']="5px solid green";
        bar[min_idx].style['border-left']="5px solid red";
    }

    function fun(arr,i,min_idx){
        var temp=arr[i];
        arr[i]=arr[min_idx];
        arr[min_idx]=temp;
        bar[i].style.height=arr[i];
        bar[min_idx].style.height=arr[min_idx];
        bar[i].style['border-left']="5px solid blue";
        bar[min_idx].style['border-left']="5px solid blue";
    }

    var min_idx;  
    var add=0;
    var del=Math.floor((20000/Math.floor(speed)))-100;
    for (let i = 0; i < bar.length-1; i++)  
    {  
        // Find the minimum element in unsorted array  
        min_idx = i;  
        for (let j = i+1; j < bar.length; j++)  
        if (b[j] < b[min_idx])  
            min_idx = j;  
  
        // Swap the found minimum element with the first element  
        var temp=b[i];
        b[i]=b[min_idx];
        b[min_idx]=temp;
        
        add+=del/2;
        setTimeout(fun1,add,arr,i,min_idx);
        add+=del/2;
        setTimeout(fun,add,arr,i,min_idx);
        

    }  


}