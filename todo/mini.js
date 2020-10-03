// creating close button for listes that are not created in main function()
var myList = document.getElementsByTagName('li');
var index;
for(index=0;index<myList.length;index++){
    var aSpanTag = document.createElement('SPAN')
    var someTxt = document.createTextNode("\u00d7")
    aSpanTag.className = "close"
    aSpanTag.appendChild(someTxt)
    myList[index].appendChild(aSpanTag)
}
// .close button
var closeButton= document.getElementsByClassName("close")
for(i= 0;i<closeButton.length;i++){
    closeButton[i].onclick = function(){
       var theDiv = this.parentElement
       theDiv.style.display ="none"
    }
}
// creating checked tofo
var ulList = document.querySelector('ul')
    ulList.addEventListener('click', function(event){
    if(event.target.tagName === "LI"){
       event.target.classList.toggle('checked');
    }
},false)

// creating to do function()
function CreateNewElement(){
    var li = document.createElement('li')
    var theInput = document.getElementById('the-input').value
    var textNode = document.createTextNode(theInput)
    li.appendChild(textNode)
    if(theInput===""){
        alert("this cannot be empty")
    }else{
        document.getElementById('the-ul').appendChild(li)
    }
    document.getElementById("the-input").value="";

    var thePanTag = document.createElement("SPAN")
    var txt = document.createTextNode("\u00d7")
    thePanTag.className = "close"
    thePanTag.appendChild(txt)
    li.appendChild(thePanTag)
    //removing items when clicked on span close button
    for(i= 0;i<closeButton.length;i++){
        closeButton[i].onclick = function(){
        var theDiv = this.parentElement
        theDiv.style.display ="none"
    }
  }
}