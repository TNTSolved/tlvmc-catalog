

$( document ).ready(function() {
 
	$(window).keydown(function(e){
		if (e.keyCode==9 || e.keyCode==48) {
			$(".tabmenu").css("display", "block");
			$(".tabmenu").first().focus();
		}
		if (e.keyCode==27) {
			$(".tabmenu").css("display", "none");
		}
	});

	$('.tabmenu').keydown(function(e){
		if ([13].indexOf(e.keyCode) == -1) {
		    return;
		}

		switch(e.keyCode) {
		    case 13:	/*	Tab Pressed	*/
			var dropdown = $(e.target);
			dropdown=dropdown.parent("li").children("ul");

			if(dropdown.length > 0){
			    e.defaultPrevented;
			    e.stopPropagation();
			    dropdown.css("display", "block");
			    /*TODO: Put trigger to force tab*/
			}
			break;
		}
	});


	$("#toggleBNagish_new").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#BNagishMenu_new').toggle();
	});

	$("#BNagish_new_Close").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#BNagishMenu_new').toggle();
	});

	$("#BNagish_new_Grayscale").click(function(e) {
		e.preventDefault();
		toggleGrayscale($(this));
	});

	$("#BNagish_new_Inverted").click(function(e) {
		e.preventDefault();
		toggleInverted($(this));
	});

	$("#BNagish_new_DefaultColors").click(function(e) {
		e.preventDefault();
		defaultColors($(this));
	});


	var zoomBody = readCookie('newZoom');
	if(zoomBody !== null && typeof(zoomBody) !=='undefined'){
	    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	        jQuery("body").css("transform","scale("+zoomBody+")");
			jQuery("body").addClass("firefoxTransformFix");
	    }else{
	        jQuery("body").css("zoom",zoomBody);
	    }
	}
    
 
    /*first check if some cookie exists
    */
   var selectedColor = readCookie("bnagishChoosen");

    $('html').removeClass();
    switch (selectedColor) {
		case 'BNagish_Inverted':
		    $('html').addClass('Nagish-Inverted');
		    break;
		case 'BNagish_Grayscale':
		    $('html').addClass('Nagish-Grayscale');
		    break;
    }
});

function setActiveButton(linksClass,elm) {
	$(linksClass).each(function(){
		if	($(this).attr("id") == elm.attr("id")) {
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
    createCookie('bnagishChoosen',elm.attr('id'),100);
}

function defaultColors(btnElemenet){
	$("html").removeClass("Nagish-Grayscale");
	$("html").removeClass("Nagish-Inverted");
	setActiveButton(".webColors", btnElemenet);
}

function toggleInverted(btnElemenet){
	$("html").removeClass("Nagish-Grayscale");
	$("html").toggleClass("Nagish-Inverted");
	setActiveButton(".webColors", btnElemenet);
}

function toggleGrayscale(btnElemenet){
	$("html").removeClass("Nagish-Inverted");
	$("html").toggleClass("Nagish-Grayscale");
	setActiveButton(".webColors", btnElemenet);
}

function readCookie(name) { 
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }

}

function createCookie(name,value,days) { 
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    
}

var size_win = window.screen.width;
var num_count =0;
if(size_win>=767){
	num_count = 5 ;
}else{
	num_count = 1; 
}
var fontsizeI=0;
var k=0;
function increaseFontSize() {
	if(fontsizeI<num_count){
    var existingZoom=readCookie('newZoom');
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        if(existingZoom==null || typeof (existingZoom)=='undefined'){
            var existingZoom=jQuery("body").css("transform");
        }
        if(existingZoom=='none'){
            existingZoom=1;
        }else{
            /*existingZoom=existingZoom.substring(7,10);*/
        }
        newZoom = (parseFloat(existingZoom))+0.1;
		jQuery("body").css("transform", "scale(" + newZoom + ")");
		jQuery("body").addClass("firefoxTransformFix");


    }else{

        if(existingZoom==null || typeof (existingZoom)=='undefined'){
           var existingZoom = jQuery("body").css("zoom");
        }
        if(existingZoom=='normal'){
            existingZoom=1;
        }
        else if(existingZoom.search('%')!=-1){
            existingZoom=parseInt(existingZoom)/100;
        }

        newZoom = (Math.round( existingZoom * 10 ) / 10)+0.1;
        jQuery("body").css("zoom",newZoom);
       }
        createCookie('newZoom',newZoom,30);
		fontsizeI++;
    }
}

function decreaseFontSize() {
	if(fontsizeI>-5){
    var existingZoom=readCookie('newZoom');

    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        if(existingZoom==null || typeof (existingZoom)=='undefined'){
           var existingZoom=jQuery("body").css("transform");
        }
        if(existingZoom=='none'){
            existingZoom=1;
        }else{
            /*existingZoom=existingZoom.substring(7,10);*/
        }
        newZoom = (parseFloat(existingZoom))-0.1;
		jQuery("body").css("transform", "scale(" + newZoom + ")");
		jQuery("body").addClass("firefoxTransformFix");

    }else{
        if(existingZoom==null || typeof (existingZoom)=='undefined'){
            var existingZoom = jQuery("body").css("zoom");
        }
        if(existingZoom=='normal'){
            existingZoom=1;
        }
        else if(existingZoom.search('%')!=-1){
            existingZoom=parseInt(existingZoom)/100;
        }

        newZoom = (Math.round( existingZoom * 10 ) / 10)-0.1;
        jQuery("body").css("zoom",newZoom);
    }
     createCookie('newZoom',newZoom,30);
       fontsizeI--;
	}
}


function resetFontSize() {
	fontsizeI = 0;
    newZoom = 1;
    jQuery("body").css("zoom",newZoom);
    createCookie('newZoom',newZoom,30);
	var existingZoom = readCookie('newZoom');
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		jQuery("body").css("transform", "scale(1)");
	}
}