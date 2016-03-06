// "XOOM" ist used by tiles creator (infinitedrag.js), that why its here declared already
var allclasses = "blufor opfor me indi vehicles marker dead";
var xoom = 1;
var url = 'file:///C:/Users/cAt/Documents/MapLock v4 061/MapLock v4 061/test2del1/bin/Release/date.txt';  // RELOAD DATA FROM FILE
// var url = 'file:///D:/date.txt';  // RELOAD DATA FROM FILE

var markers = 1;
var toleft; // position in pixels to left
var totopp; // position in pixels to top

var x0 = 0.020714285; 	//FOR ZOOM 1
var x1 = 0.011328125; 	//FOR ZOOM 1
var x2 = 0.0056640625; 	//FOR ZOOM 2
var x3 = 0.00283203125;
var x4 = 0.00145;
var c = x1;			//DEFAULT SETTING

var viewportHeight;
var viewportWidth;

// VIEWPORT AUTO RESIZE AND GETTIN SIZES

function viewportSize() {		// viewport size setting function
	viewportHeight = ($(window).height() );
	viewportWidth = ($(window).width() - 180 );
	$('#viewport').css('height', viewportHeight);
	$('#viewport').css('width', viewportWidth);
	$('#sidepanel').css('height', viewportHeight);
};

$(function(){		// document ready to assure until viewport size is right
	viewportSize();
});

$(window).resize(function () { // reset viewport size if windows gets resized
	viewportSize();
});

function rPosition(elementID, mouseX, mouseY) {
  var offset = $('#'+elementID).offset();
  var x = mouseX - offset.left;
  var y = mouseY - offset.top;

  return {'x': x, 'y': y};
}
var posi = $(document).mousemove();
console.log("POSITION" + posi);

function convertCoords(a) { 		// Convert the coords to pixels method
	var a;
	a = a / c;
	var a = Math.round(a) + 256;
	return a;
}

function xooming(a){

	if (a){++xoom;}
	else {--xoom}; 	//IF POSITIV ZOOM + 1, ELSE ZOOM - 1

	$('div').remove('._tile'); 						 // CLEARING OLD TILES BY XOOM
	var wall = jQuery.infinitedrag("#wall", {}, {}); // Starts creating tiles again

	if (xoom==0) {c=x0}		 //RATIO "C" for zoom1
	else if (xoom==1) {c=x1}//RATIO "C" for zoom1
	else if(xoom==2){c=x2}  //RATIO "C" for zoom2
	else if(xoom==3){c=x3}  //RATIO "C" for zoom2
	else if(xoom==4){c=x4};  //RATIO "C" for zoom2
};

$(function(){
	$(".plus").click(function () {
		xooming(1);
		return false;
	});

	$(".minus").click(function () {
	   xooming(0);
	   return false;
	});
});

var autofollow = false;	 // CHECK AUTOFOLLOW

$(function(){ // ON DOCUMENT READY because autofollow button must be loaded
	$("#follow").click(function () {
		autofollow = !autofollow;
		$(this).toggleClass('active');
		return false;
	});
});

						// Object ARRAY  ***************** START
function reloaddata(){
  $.ajax({
  url: url,
  async: false, // OR false if errors
  dataType: "script",
  });
};
reloaddata();

						// Object class  ***************** END
function adding(i) {
	$('#wall').append('<em id="' + i + '"></em>');
};



function control(){		// ICONS POPULATION CONTROL
		markerscount = markers.length;
		var Iobject = $("em");
		var icount = Iobject.length;

		for (i=icount; i > markerscount; i--)
		{
			Iobject.slice(1).remove();
		}
		for (i=icount; i < markerscount; i++)
		{
			adding(i);
		}
		$("#tile").error(function () {
			$(this).hide();
		});
};


function getteam (a){ // TEAM CLASS CONVERSION
	if(a == 1){
		return "blufor";
	}
	else if(a == 2){
		return "opfor";
	}
	else if (a == 3){
		return "indi";
	}
	else if(a == 4){
		return "vehicles";
	}
	else if (a == 0){
		return "me";
	}
	else if (a == 5){
		return "unknown";
	};
};


function render(){

	for (i=0; i < markerscount; i++)
	{

		// if ($("." + i)){};
		var dead = markers[i][0];
		var teamcalss = getteam(markers[i][5]);
		var deg = (markers[i][4]);
		var toleft = ( markers[i][2] / c );
		var totop = ( markers[i][3] / c );

		console.log("toleft: ",toleft,"totop: ",totop);
		console.log("cox: ",markers[i][2],"coy: ",markers[i][3]);
		console.log("zoom ratio is: ",c);

		var object = $("#" + i);

		object.removeClass(allclasses);
		object.addClass("marker");
		object.addClass(teamcalss);
		var oldleft = object.attr('data-left');
		var oldtop = object.attr('data-top');
		$('#debug').text(markerscount)
		if (oldleft != toleft && oldtop != totop){
			object.css({
				left: toleft,
				top: totop,
				'-webkit-transform': 'rotate(' + deg + 'deg)'
			});
		};
		if(autofollow && teamcalss=="me"){
				$('#wall').css('top', (( viewportHeight / 2 ) - totop)).css('left', (( viewportWidth / 2 ) - toleft));
		} else {};

	}

		reloaddata();
};


	setInterval( render,
	250);

	setInterval( control,
	500);

	render();

$(function(){
// RAPHEL:--------------------------------

var paper = Raphael("wall", viewportWidth, viewportHeight);
var circle = paper.circle(0 , 0 , 10);

// RAPHEL:--------------------------------

// var img = document.getElementById("myImg");
// img.onerror = function () {
    // this.style.display = "none";
// }

});
