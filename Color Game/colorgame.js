var colors=[];
var pickedColor;
var numOfSquare=6;
var squares=document.querySelectorAll(".square");
var colorDisp=document.querySelector("#headcolor");
var messageDisp=document.querySelector("#message");
var head=document.querySelector("h1");
var resetBut=document.querySelector("#reset");
var modeBtn=document.querySelectorAll(".mode");

init();

resetBut.addEventListener("click",function(){
	
	reset();
});

function init(){

	setModBtn();

	setSquares();

	reset();
}


function changeColors(color){
	for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor=color;
	}
}

function pickColor(){
	var rand=Math.floor(Math.random()*colors.length);
	return colors[rand]; 
}

function generateRandColor(num){
	//make an array
	var arr=[];
	//add num random colors to array
	for(var i=0;i<num;i++){
		arr.push(randomColor());
	}

	return arr;
}

function randomColor(){
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);
	return "rgb(" + r +", " + g+ ", " + b +")";
}

function reset(){
	colors=generateRandColor(numOfSquare);
	//pick new color from the array
	pickedColor=pickColor();
	//change colorDisp to match the new picked color
	colorDisp.textContent=pickedColor;
	//changethe colors of the square
	for(var i=0;i<squares.length;i++){
		if(colors[i]){
			squares[i].style.display="block";
			squares[i].style.backgroundColor=colors[i];
		}
		else{
			squares[i].style.display="none";
		}
		
	}	
	head.style.backgroundColor="steelblue";
	messageDisp.textContent="";
	resetBut.textContent="New Colors";
}

function setModBtn(){

	for(var i=0;i<modeBtn.length;i++){
		modeBtn[i].addEventListener("click",function(){
		modeBtn[0].classList.remove("selected");
		modeBtn[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent==="EASY" ? numOfSquare=3: numOfSquare=6;
		reset();
		})
	}
}

function setSquares(){
	for(var i=0;i<squares.length;i++){
	squares[i].style.backgroundColor=colors[i];

	squares[i].addEventListener("click",function(){
		var clickedColor=this.style.backgroundColor;
		if(clickedColor===pickedColor){
			messageDisp.textContent="Correct!";
			changeColors(pickedColor);
			head.style.backgroundColor=pickedColor;
			resetBut.textContent="Play Again?"
		}
		else{
			this.style.backgroundColor="#232323";
			messageDisp.textContent="Try Again";
		}
	})
	}
}