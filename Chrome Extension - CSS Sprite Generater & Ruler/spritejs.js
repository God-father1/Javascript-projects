/*================= Variables Declarations ====================== */

var resizeCanvas = new Object();
var canvasInsideImage = new Object();
var dataImage = 1;


/*============================= Event Listeners =============================== */

$(document).ready(function() {

	$(".resize-sprite").css("left", $(".sprite-main-canvas").offset().left + $(".sprite-main-canvas").outerWidth() + "px"); //Setting Position of Resize Icon
	$(".tip").css("left",$(".sprite-main-canvas").offset().left);
	$(".sprite-main-canvas").click(function(e){
		    e.preventDefault();
		    if (e.target != this) {
		        return false;
		    }

	});


    document.getElementById("download").addEventListener("click", function() { //Converting HTML5 to Canvas on download button click
        $(".sprite-main-canvas").css("background", "none");
        $(".sprite-main-canvas").css("border","none");
        $(".canvasInsideImg").css("border","none");
        html2canvas($(".sprite-main-canvas"), {

            onrendered: function(canvas) {

                canvas.setAttribute("id", "canvas");
                document.getElementById("createdCanvas").appendChild(canvas);
                var downloadLink = document.createElement("a");
                downloadLink.setAttribute("id", "downloadLink");
                document.body.appendChild(downloadLink);
                downloadCanvas(document.getElementById("downloadLink"), 'canvas', 'sprite.png');
                downloadCss(); //Function To Download CSS
            }
        });

    });

    $("#upload").on("click", function(e) {
    	e.preventDefault();
    	$(".deleteImage").css("visibility","hidden");
    	$("#fileInput").click();
    });

    $("#fileInput").change(function(ev){

    	var f = ev.target.files[0];
	    var fr = new FileReader();
	    
	    fr.onload = function(ev2) {

	        var image = document.createElement("img");
	        image.setAttribute("class","canvasInsideImg");
	        image.setAttribute("src",ev2.target.result);
	        
	        image.setAttribute("alt","Shehroz's Sprite Generator Image");
	        image.addEventListener("mousedown",canvasImgMouseDown);
	        image.setAttribute("data-image",dataImage);
	        image.setAttribute("width",image.width);
	        image.setAttribute("height",image.height);
	        image.addEventListener("dblclick",canvasImagedblclick);

	        document.getElementsByClassName('sprite-main-canvas')[0].appendChild(image);


	        $(image).draggable({
		        containment: ".sprite-main-canvas",
		        scroll: false,
		        drag: function(event) {
		            o = $(this).offset();
		            p = $(this).position();
		            
		        }
		    }).css("position","absolute");
	        
	        writeCssOnLoad(f.name,image);
	        
	    };
	   
	    fr.readAsDataURL(f);
	    
    });

	$(".sprite-main-canvas").on("dragenter",function(e){
		e.stopPropagation();
  		e.preventDefault();
	});

	$(".sprite-main-canvas").on("dragover",function(e){
		e.stopPropagation();
  		e.preventDefault();
	});

	$(".sprite-main-canvas").on("drop",function(e){
		e.stopPropagation();
  		e.preventDefault();
  		var dt = e.dataTransfer;

		var files = e.originalEvent.dataTransfer.files;

		document.getElementById('fileInput').files = files;
	});

    $(".resize-sprite").on("mousedown", resizeCanvasFunc);

    $(".canvasInsideImg").on("mousedown",canvasImgMouseDown);


    $(".canvasInsideImg").dblclick(canvasImagedblclick);
   			
});


/*================================= Functions ===============================*/

function downloadCanvas(link, canvasId, filename) {

    href = document.getElementById(canvasId).toDataURL();
    link.setAttribute("href", href);
    link.setAttribute("download", filename);
    link.click();
    $(".sprite-main-canvas").css("background", 'url("img/grid.png")');
    $(".sprite-main-canvas").css("border","1px solid #A5A5A5");
}


function resizeCanvasMouseMove(e) {

    e.preventDefault();

    startY = resizeCanvas.relativeYCanvas;
    startX = resizeCanvas.relativeXCanvas;


    var x_axis = event.clientX;
    var y_axis = event.clientY;



    var canvas = $(".sprite-main-canvas");
    var height = resizeCanvas.startHeight - (resizeCanvas.relativeYCanvas - event.clientY);

    if (height > 0) {
        $(".sprite-main-canvas").css("height", height + "px");


    }
    var width = resizeCanvas.startWidth - (resizeCanvas.relativeXCanvas - event.clientX);
    if (width > 0 && width < 883) {
        $(".sprite-main-canvas").css("width", width + "px");
        var left_margin = $(".sprite-main-canvas").offset().left;
        $(".resize-sprite").css("left", left_margin + width + "px");
    }

}



function resizeCanvasFunc(e) {

    e.preventDefault();
    if (e.target != this) {

        return;
    }
    var canvas = $(".sprite-main-canvas");

    resizeCanvas.startHeight = canvas.outerHeight();
    resizeCanvas.startWidth = canvas.outerWidth();

    resizeCanvas.relativeXCanvas = e.clientX; //Get X-axis of user,when user clicked anywhere on the body
    resizeCanvas.relativeYCanvas = e.clientY; //Get Y-axis of user,when user clicked anywhere on the body

    document.addEventListener("mousemove", resizeCanvasMouseMove); //Adding Event of MouseMove to measure the Mouse Movement after the click :). Check drawonMousemove() function

    document.addEventListener("mouseup", function(event) {


        document.removeEventListener("mousemove", resizeCanvasMouseMove); //Removing MouseMove function & stop drawing canvas, when user leaves the mouse button!


    });
}

function canvasImgMouseDown(event){

		
		$(".deleteImage").css("visibility","hidden");
		$(".deleteImage").off("click");
		$(".canvasInsideImg").css("border","1px solid transparent");
		$(".css-list li").css("background","#fff");
    	event.preventDefault();

		if (event.target != this) {
		    return false;
		}
		var dataImageNumber = $(this).data("image");
		var thisImageList   = $(".css-list li[data-list='"+dataImageNumber+"']");
		thisImageList.css("background","rgba(204, 204, 204, 0.22)");

		$(this).css("border","1px dashed #cd000a");

		$(this).on("mousemove",function(){
			
			var thisImageLeft = parseInt(document.defaultView.getComputedStyle(this).left, 10);
			var thisImageTop  =  parseInt(document.defaultView.getComputedStyle(this).top, 10);

			thisImageLeft = thisImageLeft > 0 ? -(thisImageLeft) : thisImageLeft;
			thisImageTop = thisImageTop > 0 ? -(thisImageTop) : thisImageTop;


			if(isNaN(thisImageLeft)  && isNaN(thisImageLeft)){
				
				var imageTopPosition = parseInt($(this).offset().top - $(".sprite-main-canvas").offset().top);
				var imageLeftPosition = parseInt($(this).offset().left - $(".sprite-main-canvas").offset().left);
				thisImageList.find(".background-position-value").html(imageLeftPosition + "px&nbsp;" + imageTopPosition + "px;");
			}

			else{

				thisImageList.find(".background-position-value").html(thisImageLeft + "px&nbsp;" + thisImageTop + "px;");
			}

		});

		$(this).on("mouseup",function(){


		});


}


function writeCssOnLoad(name,image){

	name = name.replace(/[^a-zA-Z0-9]/g,'');
	var imageTopPosition = parseInt($(image).offset().top - $(".sprite-main-canvas").offset().top);
	var imageLeftPosition = parseInt($(image).offset().left - $(".sprite-main-canvas").offset().left);
	var imageWidth = $(image).attr("width");
	var imageHeight = $(image).attr("height");
	var dataToAppend = "<li data-list = " + dataImage + " >" + "." + name + "\{<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;<span class='property-name'>background</span> : url(sprite.png);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='property-name'>background-position</span> : <span class='background-position-value'>" + imageLeftPosition + "px&nbsp;" + imageTopPosition + "px;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='property-name'>width</span> : " + imageWidth + "px;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='property-name'>height</span> : " + imageHeight + "px;<br>}</li>";
	$(".css-list").append(dataToAppend);
	dataImage++;
}

function canvasImagedblclick(){
 
    	var image = $(this);
    	var dataImageNumber = $(this).data("image");

    	$(".deleteImage").css("visibility","visible");

    	$(".deleteImage").click(function(){

    		var thisImageList   = $(".css-list li[data-list='"+dataImageNumber+"']");

			image.remove();
			thisImageList.fadeOut().remove();
			$(".deleteImage").css("visibility","hidden");

	    });
}

function downloadCss(){
	var data = $($(".css-list").html()).clone();
	var modifiedData = "";
	
	for(var i = 0 ; i < data.length; i++){
		var currentLi = data[i].innerHTML;
		currentLi = currentLi.replace(/<br>/g,"\n");
		currentLi = currentLi.replace(/&nbsp;/g," ");
		currentLi = currentLi.replace(/<span class="property-name">/g,"");
		currentLi = currentLi.replace(/<\/span>/g,"");
		currentLi = currentLi.replace(/<span class="background-position-value">/g,"");
		currentLi = currentLi.replace(/\}/g,"\}\n");
		modifiedData += currentLi;
	}

	var link = document.createElement("a");
	var content = "data:text/css;charset=utf-8,";
	content += encodeURI(modifiedData);

	link.setAttribute("href",content);
	link.setAttribute("download", 'styles.css');
	document.body.appendChild(link);
	link.innerText = "test";
	link.click();
}