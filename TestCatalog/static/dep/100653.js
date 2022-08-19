$(document).ready(function() {

    /* GENERIC TOGGLE ELEMENT */
    function showElement(elemSelector, duration){
        $(elemSelector).fadeIn(duration);
        $(elemSelector).attr('data-status', 'opened');
        $(elemSelector).attr('aria-hidden', 'false');
        return 'opened';
    }

    function hideElement(elemSelector, duration){
        $(elemSelector).fadeOut(duration);
        $(elemSelector).attr('data-status', 'closed');
        $(elemSelector).attr('aria-hidden', 'true');
        return 'closed';
    }

    function toggleElement(elemSelector, duration){
        if($(elemSelector).attr('data-status') == 'opened'){

            return hideElement(elemSelector, duration);
        } else {
            return showElement(elemSelector, duration);
        }
    }

    function toggleElementAuto(buttonSelector, duration){
        var elemSelector = $(buttonSelector).attr('data-selector-toggle');
        return toggleElement(elemSelector, duration);
    }

    $('.menuToggleBtn').on('click', function(event){
		event.stopPropagation();
		var toggleStatus = toggleElement('#menuWindow', 150);
		$('.menuItemBtn').removeClass('active');

		if(toggleStatus == "opened"){
			$(this).addClass('active');
           
		} else {
			$(this).removeClass('active');
            
		}
	});

	// Top SubMenu
	$('.subMenuCollapseBtn').on('click', function(event){
		event.stopPropagation();

		var btnSelector = '#'+$(this).attr('id');
		var toggleStatus = toggleElementAuto(btnSelector, 150);
		if(toggleStatus == "opened"){
			$(this).addClass('active');
			$(this).parent().addClass('active');
		} else {
			$(this).removeClass('active');
			$(this).parent().removeClass('active');
		}
	});


    $('.icon-globe').mouseenter(function(){$('.icon-globe').click();})

    $('.drop-lang').mouseleave(function(){$('.icon-globe').click();})

/**START SCROLL UP/DOWN  FOOTER ITEMS */
// var scrollHeight = height=screen.height; 
setTimeout(() => {
    var mywindow = $(window);
    var mypos = mywindow.scrollTop();
    mywindow.scroll(function() {
        if(($(document).height() - 200) < (parseInt(mywindow.scrollTop()) + parseInt($(window).height())) ){
            $('.wrapper-all-sticky-bar').fadeIn(150);
        } else if(mywindow.scrollTop() > mypos){
            $('.wrapper-all-sticky-bar').fadeOut(150);  
        }else{
            $('.wrapper-all-sticky-bar').fadeIn(150);
        }
        mypos = mywindow.scrollTop();
    });
}, 2000);

/**END SCROLL UP/DOWN  FOOTER ITEMS */

$('.dropdown').hover(
    function() {
        $(this).addClass("open");
    }, function() {
        $(this).removeClass("open");
    }
);

$(function() {
 $('input, textarea').placeholder();
});


$(".myDiv").click(function() {
    $(this).find(".shareDialog").slideToggle();
})
/*function to hide .myDiv when click outside - can be slow on client!!*/
$(document).mouseup(function (e)
{
    var container = $(".shareDialog");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});



    $(".sideMenuToggle").click(function(){
        $(".sideMenuWrap").toggle();

    });

    $(".closeSideMenu").click(function(){
        $(".sideMenuWrap").toggle();
    });

     /* Replace all SVG images with inline SVG*/

        jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                /* Get the SVG tag, ignore the rest */
                var $svg = jQuery(data).find('svg');

                /* Add replaced image's ID to the new SVG */
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                /* Add replaced image's classes to the new SVG */
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                /* Remove any invalid XML tags */
                $svg = $svg.removeAttr('xmlns:a');

                /* Replace image with new SVG */
                $img.replaceWith($svg);

            }, 'xml');

        });


    /* SHARE BUTTONS TOGGLE */





    /* SHARE BUTTONS TOGGLE */
    $("#emailDialogToggle").click(function(){
        $(".emailDialog").slideToggle();
    });
    $("#emailDialogToggle2").click(function(){
        $(".emailDialog").slideToggle();
    });

    /* Detect IE and Firfox and Add Class For CSS */
    if(navigator.userAgent.match(/Trident/)) {
        $('.siteWrapper').addClass('ie');
    }else{
        if(navigator.userAgent.match(/Firefox/)){
            $('.siteWrapper').addClass('ff');
        }
    }
    $(".accessibilityLink").focus(function() { $(this).css("top", "20px");});
    $(".accessibilityLink").blur(function() { $(this).css("top", "-1000px");});
    $( ".searchToggle" ).click(function() {
        $( ".searchMobileForm" ).toggle()
    });

    $( "#closeSearchForm" ).click(function() {
        $( ".searchWrapperCont" ).slideUp("fast")
    });



    });


    function myFunction(x) {
        x.classList.toggle("change");
    }

	$('.loginButton').click(function(){
		$('.loginFrame').fadeIn();
		$('.loginFrameWrapper').fadeIn();
	});

	$('.openForgotPassword').click(function(){
		$('.openForgotPassword').fadeOut();
		$('.forgotPasswordForm').slideDown();
	});

	$('.loginFormClose').click(function(){
		$('.loginFrameWrapper').fadeOut();
		$('.loginFrame').fadeOut();
	});

	$('.basket').click(function(){
				document.location="https://www.sheba.co.il/0";
	});


    $("#languageSelect dt a").click(function() {
        $("#languageSelect dd ul").toggle();
    });

    $("#languageSelect dd ul li a").click(function() {
        var text = $(this).html();
        $("#languageSelect dt a span").html(text);
        $("#languageSelect dd ul").hide();

	document.location=getSelectedValue("languageSelect");
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }
    $('.subscribeButton').bind('click', function(e) {
        jQuery(".loader").fadeIn(100);
        jQuery.ajax({
            type: "POST",
            url: "https://www.sheba.co.il/devices/desktop/sheba/php_process/form_page.php",
            data: $('#emailNewsletter').serialize(),
            async:"true",
            error: function () {
                jQuery(".loader").fadeOut(300);
                /*alert('קרתה תקלה, אנא נסה/י שנית');*/
            },
            success: function(data){
                alert('תודה על הרשמתך..(יש לפתח)');
                jQuery(".loader").fadeOut(300);
            }
        });
     });
    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("dropdown"))
            $("#languageSelect dd ul").hide();
    });

 function getCitiesAjax(thisObj){
     jQuery(thisObj);
     jQuery(".loader").fadeIn(300);
	if(true){
        jQuery.ajax({
            type: "POST",
            url: "https://www.sheba.co.il/site/php_components/ajax_get_cities.php",
            data: "cityName="+thisObj.value+"&inputId="+thisObj.id,
            async:"true",
            error: function () {
                /*alert('קרתה תקלה, אנא נסה/י שנית');*/
                jQuery(".loader").fadeIn(300);
            },
            success: function(data){
                jQuery("#autocompleteDiv").show();
                jQuery("#autocompleteDiv").html(data);
                jQuery(".loader").fadeOut(300);
            }
        });
    }
 }

/* Cookie Creation*/
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+((days*24*60*60 + 10800)*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
/* END Cookie Creation*/


/* Delay Button Loader */
function disableDelayBtn(buttonElement){
    $(buttonElement).find('.cssLoader').remove();
    $(buttonElement).find('.hidden').removeClass('hidden');
    $(buttonElement).prop("disabled", false);
}

function delayBtn(buttonElement, delayTime){
    $(buttonElement).wrapInner("<div class='hidden'></div>");
    $(buttonElement).prop("disabled", true);
    $("<div class='cssLoader'></div>").insertAfter($(buttonElement).find('.hidden'));
    setTimeout(function () {
        disableDelayBtn(buttonElement);
    }, delayTime);
}
/* END Delay Button Loader */

