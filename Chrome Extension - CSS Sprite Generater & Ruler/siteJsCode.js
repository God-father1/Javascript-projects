//Written By Shehroz Sheikh
//FrontEnd Developer at FiveRivers Technology
//Version 1.0
//Measure Extension Google Chrome



//Variables Declaration
if ($("measureWrapper") != null) {
    $("#measureWrapper").remove();
}
if ($("#results-wrapper") != null) {
    $("#results-wrapper").remove();
}
if($("#escape-info") != null){
    $("#escape-info").remove();
}
var relativeX = 0;
var relativeY = 0;
var canvasMove = new Object();
var pageBody = document.getElementsByTagName("html")[0];
$("body").css("cursor", "crosshair");

createElements(); //Calling Function to Create Elements!. 

//This function will create the Elements and append these elements after the body


console.log("Sprite Generator Extension Running");





/*===================================== EVENT LISTENERS ======================================*/

$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        
        $("#measureWrapper").remove();
        $("#results-wrapper").remove();
        $("#escape-info").remove();
        $("body").css("cursor", "auto");

    }

})

document.getElementById("measureBackground").addEventListener("mousedown", drawMouseDown); //Function to detect the user click on DOM.

document.getElementById("measureCanvas").addEventListener("mousedown", function(e) {

        e.preventDefault();

        canvasMove.clickX = event.clientX; //X-Axis of User when user clicked on canvas
        canvasMove.clickY = event.clientY; //Y-Axis of User when user clicked on canvas
        canvasMove.offsetTop = $("#measureCanvas").offset().top;
        canvasMove.offsetLeft = $("#measureCanvas").offset().left;

        document.addEventListener("mousemove", canvasMouseMove);

    });
    document.getElementById("measureCanvas").addEventListener("mouseup", function(e) {

        document.removeEventListener("mousemove", canvasMouseMove);
    });

document.getElementById('resizeIcon').addEventListener("mousedown", resizeCanvasMouseDown);




/*====================================== My functions =========================================*/

function drawMouseDown(e) { //This Function will trigger When User will click on the body
    e.preventDefault();
    if (e.target != this) {
        return false;
    }

    document.getElementById("measureBackground").setAttribute("style", "opacity: 0.4;background-color: rgb(255, 255, 255);");
    document.getElementById("measureCanvas").setAttribute("width", "0");
    document.getElementById("measureCanvas").setAttribute("height", "0");
    document.getElementById("measureCanvas").setAttribute("style", "border:none;border-image:none");

    relativeX = e.clientX; //Get X-axis of user,when user clicked anywhere on the body
    relativeY = e.clientY; //Get X-axis of user,when user clicked anywhere on the body

    var border_url = chrome.extension.getURL('img/border.png');
    document.getElementById("measureCanvas").setAttribute("style", "position:fixed;top:" + relativeY + "px;left:" + relativeX + "px;border: 7px solid #c3c3c3;border-image:url(" + border_url + ") 30 round;");

    document.addEventListener("mousemove", drawOnMousemove); //Adding Event of MouseMove to measure the Mouse Movement after the click :). Check drawonMousemove() function

    document.addEventListener("mouseup", function(e) {

        document.removeEventListener("mousemove", drawOnMousemove); //Removing MouseMove function & stop drawing canvas, when user leaves the mouse button!

        var canvas = document.getElementById("measureCanvas");

        var left = parseInt(document.defaultView.getComputedStyle(canvas).left, 10);
        var top = parseInt(document.defaultView.getComputedStyle(canvas).top, 10);

        document.getElementById('resizeIcon').style.left = canvas.width + left - 4 + "px";
        document.getElementById('resizeIcon').style.top = canvas.height + top - 4 + "px";


        canvas.setAttribute("class", "movecursor");

    });
}



function drawOnMousemove() { //This Function will detect the Position when the mouse will move.And it will draw canvas by measuring the x,y co-ordinates :)


    var x_axis = event.clientX;
    var y_axis = event.clientY;
    var resizeIcon = document.getElementById('resizeIcon');

    if ((y_axis - relativeY) > 0) {
        var height = y_axis - relativeY;
        document.getElementById("measureCanvas").setAttribute("height", height);
        document.getElementById("measureheight").innerText = height + 14 + " px";

    } else {
        var height = -(y_axis - relativeY);
        document.getElementById("measureCanvas").setAttribute("height", height);
        var top = parseInt(document.getElementById("measureCanvas").style.top);
        document.getElementById("measureCanvas").style.top = y_axis + "px";
        document.getElementById("measureheight").innerText = height + 14 + " px";

    }

    if ((x_axis - relativeX) > 0) {
        resizeIcon.style.left = 0;
        var width = x_axis - relativeX;
        document.getElementById("measureCanvas").setAttribute("width", width);
        document.getElementById("measurewidth").innerText = width + 14 + " px";
        drawPixelsWidth(width + 14);
        drawPixelsHeight(y_axis - relativeY + 14);

    } else {
        var width = -(x_axis - relativeX);
        var height = -(y_axis - relativeY);
        document.getElementById("measureCanvas").setAttribute("width", width);
        var left = parseInt(document.getElementById("measureCanvas").style.left);
        document.getElementById("measureCanvas").style.left = x_axis + "px";
        document.getElementById("measurewidth").innerText = width + 14 + " px";
        drawPixelsWidth(width + 14);
        drawPixelsHeight(-height + 14);
    }

    document.getElementById("measuretop").innerText = relativeY + " px";
    document.getElementById("measureleft").innerText = relativeX + " px";

}


function createElements() { //This function will create the Elements and append these elements after the body

    var measureWrapper = document.createElement("div");
    measureWrapper.setAttribute("id", "measureWrapper");
    var measureBackground = document.createElement("div");
    measureBackground.setAttribute("id", "measureBackground");
    var measureCanvas = document.createElement("canvas");
    measureCanvas.setAttribute("id", "measureCanvas");
    measureCanvas.setAttribute("style", "position:fixed");
    measureCanvas.setAttribute("width", "10");
    measureCanvas.setAttribute("height", "10");
    pageBody.appendChild(measureWrapper);
    measureWrapper.appendChild(measureBackground);
    measureWrapper.appendChild(measureCanvas);
    var resultsWrapper = document.createElement("div");
    resultsWrapper.setAttribute("id", "results-wrapper");
    pageBody.appendChild(resultsWrapper);
    var escape_info = document.createElement("div");
    escape_info.setAttribute("id","escape-info");
    escape_info.innerText = "Press Escape To Exit";
    escape_info.setAttribute("style","position: fixed;top: 0px;z-index: 8000;font-size:15px;margin: 0px auto;margin-left: 40%;background: #cd000a;color: #fff;padding: 3px;border-radius: 4px;")
    pageBody.appendChild(escape_info);
    var resultsWrapperHTML = '<div class="show-result"><span class="measureLabel">Width : </span><span id="measurewidth"></span></div><div class="show-result"><span class="measureLabel">Height : </span><span id="measureheight"></span></div><div class="show-result"><span class="measureLabel">Left : </span><span id="measureleft"></span></div><div class="show-result"><span class="measureLabel">Top : </span><span id="measuretop"></span></div>';
    resultsWrapper.innerHTML = resultsWrapperHTML;
    var resizeIcon = document.createElement("div");
    resizeIcon.setAttribute("id", "resizeIcon");
    resizeIcon.setAttribute("style", "top:10000px;left:-6000px");
    measureWrapper.appendChild(resizeIcon);

}

    function canvasMouseMove() {

        var canvas = document.getElementById("measureCanvas");

        var resizeIcon = document.getElementById('resizeIcon');
        var drag_height = $(canvas).outerHeight();
        var drag_width = $(canvas).outerWidth();

        var position_y = canvasMove.offsetTop + drag_height - canvasMove.clickY;
        var position_x = canvasMove.offsetLeft + drag_width - canvasMove.clickX;


        $(canvas).offset({
            top: event.clientY + position_y - drag_height,
            left: event.clientX + position_x - drag_width
        });

        var left = parseInt(document.defaultView.getComputedStyle(canvas).left, 10);
        var top = parseInt(document.defaultView.getComputedStyle(canvas).top, 10);
        resizeIcon.style.top = top + canvas.height - 4 + "px";
        resizeIcon.style.left = left + canvas.width - 4 + "px";

        $("#measureleft").text(left + "px");
        $("#measuretop").text(top + "px");

    }

var startWidth, canvasHeight, top, left, relativeXCanvas, relativeYCanvas;

function resizeCanvasMouseDown(e) {

    e.preventDefault();
    if (e.target != this) {

        return;
    }
    var canvas = document.getElementById("measureCanvas");

    canvasHeight = canvas.height;
    startWidth = canvas.width;

    relativeXCanvas = e.clientX; //Get X-axis of user,when user clicked anywhere on the body
    relativeYCanvas = e.clientY; //Get Y-axis of user,when user clicked anywhere on the body

    left = parseInt(document.defaultView.getComputedStyle(canvas).left, 10) + startWidth;
    top = parseInt(document.defaultView.getComputedStyle(canvas).top, 10) + canvasHeight;


    document.addEventListener("mousemove", resizeCanvasMouseMove); //Adding Event of MouseMove to measure the Mouse Movement after the click :). Check drawonMousemove() function

    document.addEventListener("mouseup", function(event) {
        
        resizeIcon.style.left = left - (relativeXCanvas - event.clientX) - 4 + "px";
        resizeIcon.style.top = top - (relativeYCanvas - event.clientY) - 4 + "px";
        resizeIcon.style.display = "block";
        document.removeEventListener("mousemove", resizeCanvasMouseMove); //Removing MouseMove function & stop drawing canvas, when user leaves the mouse button!


    });




}

function resizeCanvasMouseMove(e) {

    e.preventDefault();
    startY = relativeYCanvas;
    startX = relativeXCanvas;


    var x_axis = event.clientX;
    var y_axis = event.clientY;



    var canvas = document.getElementById("measureCanvas");
    var height = canvasHeight - (relativeYCanvas - event.clientY);
    var resizeIcon = document.getElementById("resizeIcon");
    resizeIcon.style.display = "none";
    if (height > 0) {
        document.getElementById("measureCanvas").setAttribute("height", height);
        
        $("#measureheight").text(height + 14 + "px");
    }
    var width = startWidth - (relativeXCanvas - event.clientX);
    if (width > 0) {
        document.getElementById("measureCanvas").setAttribute("width", width);
        
        $("#measurewidth").text(width + 14 + "px");
        drawPixelsWidth(width + 14);
        drawPixelsHeight(height + 14);
    }

    document.getElementById("measuretop").innerText = relativeY + " px";
    document.getElementById("measureleft").innerText = relativeX + " px";

    c = document.getElementById('measureCanvas');
    var ctx = c.getContext('2d');
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'rgba(134, 194, 255, 0.431373)';
    ctx.fillRect(0, 0, x_axis, y_axis);
}

function drawPixelsWidth(widthPixels) {
    CT = new CanvasText;
    var width = parseInt(widthPixels / 20);

    var canvas = document.getElementById('measureCanvas');
    var context = canvas.getContext("2d");

    CT.config({
        canvas: canvas,
        context: context,
        fontFamily: "Verdana",
        fontSize: "7.7px",
        fontWeight: "bold",
        fontColor: "#000",
        lineHeight: "1"
    });
    var text = "";
    for (i = 1; i <= width; i++) {
        text += '<style="margin-right:0px">' + 20 * i + '</style>';
    }
    text += '<style="margin-left:0px">' + parseInt(widthPixels) + '</style>';

    CT.drawText({
        text: text,
        x: 5,
        y: 10
    });
}


function drawPixelsHeight(heightPixels) {
    CT = new CanvasText;
    var height = parseInt(heightPixels / 20);

    var canvas = document.getElementById('measureCanvas');
    var context = canvas.getContext("2d");

    CT.config({
        canvas: canvas,
        context: context,
        fontFamily: "Verdana",
        fontSize: "7.7px",
        fontWeight: "bold",
        fontColor: "#000",
        lineHeight: "100"


    });
    var text = "";
    var i = 1;
    for (i = 1; i <= height; i++) {

        if (i == height) {

            text = '<style="display:block">' + heightPixels + '</style>';
        } else {
            text = '<style="margin-right:0px;word-break: break-word;">' + 20 * i + '</style>';
        }
        if (i === 1) {
            CT.drawText({
                text: text,
                x: 5,
                y: 24
            });
        } else {
            CT.drawText({
                text: text,
                x: 5,
                y: (16 * i) + 6
            });
        }



    }



}