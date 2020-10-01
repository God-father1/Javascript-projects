RADIUS_L1 = 150;
RADIUS_L2 = 130;
  
// handle click on center element
$("#main").click(function() {
  // collapse all elements attached to a level 1 element
  for (var i = 0; i < $(".level1").length; i++) {
    // only if a child is visible, do a toggle = only collapse
    if (!$("#elem" + i + "child0").hasClass("hiddenLevel2"))
      toggle("elem" + i);
  }
  // collapse or expand all elements attached to the main element
  toggle("#main");
});
initialize();

function initialize() {
  // resize the container to fit the main elements width
  $(".container").css("width", $("#main").outerWidth() + "px");
  $(".container").css("height", $("#main").outerHeight() + "px");
  
  // loop through all level 1 elements  
  for (var i = 0; i < $(".level1").length; i++)
  {
      // add click-event to each element
      $("#elem" + i).click(function(e) {
        // check if the element has children
        if ( hasLevel2Children($(this).attr('id').match(/\d+/)[0]) === true ) {
          // if it does: first collapse all other elements
          for (var i = 0; i < $(".level1").length; i++) {
            // if a child is visible, then toggle -> collapse
            if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
              // do nothing for this current element
              if ("elem" + i !== $(this).attr('id'))  
                toggle("elem" + i);
            }
          }
          // then toggle this element
          toggle($(this).attr('id'));
        } else {
          // if it does not have children
          alert($(this).html());
        }
      });
      // put level 1 elements into a circular position relative to the main element
      centerx = $("#main").outerWidth() / 2;
      centery = $("#main").outerHeight() / 2;
      $("#elem" + i).css("left", centerx - RADIUS_L1 * Math.cos((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerWidth() / 2 + "px");
      $("#elem" + i).css("top", centery - RADIUS_L1 * Math.sin((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerHeight() / 2 + "px");
      
      angle = createLineFromTo("#main", "#elem" + i, "#line" + i);
      if ( hasLevel2Children(i)) 
      {
        // prepare level 2 items, position them as if they were expanded
        // so that the lines can be drawn, right after this, they will get collapsed
        redrawLevel2(i, angle, true);
        // level 2 items are initially not hidden, so toggle will collapse those elements
        toggle("elem" + i);
      }
  }
} 
  function createLineFromTo(fromElem, toElem, lineId) {
    fromTop = $(fromElem).offset().top + $(fromElem).outerHeight() / 2;
    fromLeft = $(fromElem).offset().left + $(fromElem).outerWidth() / 2;
    toTop = $(toElem).offset().top + $(toElem).outerHeight() / 2;
    toLeft = $(toElem).offset().left + $(toElem).outerWidth() / 2;
    theta = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
    //alert(theta / Math.PI * 180);
    
    if (!$(lineId).length) {
      $(fromElem).after("<div class='line lineFrom_" + $(fromElem).attr('id') + "' id='" + lineId.substring(1) + "'></div>");
    }
    $(lineId).css("width", Math.sqrt(Math.pow((fromTop - toTop), 2) + Math.pow((fromLeft - toLeft), 2)) + "px");
     
    $(lineId).css("left", (fromLeft - $("#main").offset().left) + "px");
    $(lineId).css("top", (fromTop - $("#main").offset().top) + "px");
    $(lineId).css("transform", "rotate(" + theta + "rad)");
    
    
    return theta;
  }
  
  function toggle(to) {
    if (to === "#main") {
      // toggle first level
      $(".level1").toggleClass("hiddenLevel1");
      $(".lineFrom_main").toggleClass("hiddenLine");
    } else {
      // toggle second level
      $(".lineFrom_" + to).toggleClass("hiddenLine");
      
      var i = $("#" + to).attr('id').match(/\d+/)[0];
      if ($(".elem" + i + "child").hasClass("hiddenLevel2")) {
        // now expand layer 1 element
        
        $(".elem" + i + "child").removeClass("hiddenLevel2");
        
        fromTop = $("#main").offset().top + $("#main").outerHeight() / 2;
        fromLeft = $("#main").offset().left + $("#main").outerWidth() / 2;
        toTop = $("#elem" + i).offset().top + $("#elem" + i).outerHeight() / 2;
        toLeft = $("#elem" + i).offset().left + $("#elem" + i).outerWidth() / 2;
        angle = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
        redrawLevel2(i, angle, false);
        
        
      } else {
        // now collapse layer 1 element
        for (var j = 0; j < $(".elem" + i + "child").length; j++) {
          xPos = parseFloat($("#elem" + i).css("left").slice(0, -2)) + $("#elem" + i).outerWidth() / 2; 
          yPos = parseFloat($("#elem" + i).css("top").slice(0, -2)) + $("#elem" + i).outerHeight() / 2;
          //set the right position
          xPos -= $("#elem" + i + "child" + j).outerWidth() / 2;
          yPos -= $("#elem" + i + "child" + j).outerHeight() / 2;
        
          $(".elem" + i + "child").css("left", xPos + "px");
          $(".elem" + i + "child").css("top", yPos + "px");
        }
        $(".elem" + i + "child").addClass("hiddenLevel2"); 
      } 
    }
  }
  
  function hasLevel2Children(elemId) {
    if ($(".level2").length === 0) return false;
    for (var i = 0; i < $(".level2").length; i++) {
      if ($(".level2").eq(i).hasClass("elem" + elemId + "child"))
        return true;
    }
    return false;
  }
function redrawLevel2(i, angle, preparation) {
    var j = 0;
    angle = deg(angle);
        do {
          //put sub entry on same position as its parent
          xPos = parseFloat($("#elem" + i).css("left").slice(0, -2)) + $("#elem" + i).outerWidth() / 2; 
          yPos = parseFloat($("#elem" + i).css("top").slice(0, -2)) + $("#elem" + i).outerHeight() / 2;
          amount = $(".elem" + i + "child").length;
          distance = 46 - amount * 3;
          xPos += Math.cos(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L2;
          yPos += Math.sin(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L2;
          
          //set the right position
          xPos -= $("#elem" + i + "child" + j).outerWidth() / 2;
          yPos -= $("#elem" + i + "child" + j).outerHeight() / 2;
          $("#elem" + i + "child" + j).css("left", xPos + "px");
          $("#elem" + i + "child" + j).css("top", yPos + "px");
          
          if (preparation) {
            $("#elem" + i + "child" + j).click(function() {
              // no click for hidden elements!
              if (!$(this).hasClass("hiddenLevel2"))
                alert($(this).html());
            });
            createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
          }
          
        j++;
        } while ($("#elem" + i + "child" + j).length !== 0); 
  }
function rad(degrees) {
  return degrees * Math.PI / 180;
};
function deg(radians) {
  return radians * 180 / Math.PI;
};
