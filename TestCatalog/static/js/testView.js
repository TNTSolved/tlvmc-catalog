$(document).ready(function() {
    /*start modul code*/
     $('.itemExpand').bind( "click", function() {
        var ID = $(this).attr('id');
        $('#expandWrap'+ID).toggle(500);
        if($(this).children('button').hasClass('fas fa-angle-down')){
            $(this).children('button').removeClass('fa-angle-down');
            $(this).children('button').addClass('fa-angle-up');

        }else{
            $(this).children('button').removeClass('fa-angle-up');
            $(this).children('button').addClass('fa-angle-down');
        }
    });

    /*end modul code*/

    /* Using default configuration */
     $('#showMoreText').click(function(){
        $(this).hide(1);
        $('#moreTextWrap').fadeIn(1000);
    });
    /* Using custom configuration */
    $('#carousel').carouFredSel({
        infinite: true,
        width: '100%',
        height: 'auto',
        direction  : "left",
        responsive: true,
        mousewheel: true,
        items: {
            width: 160,
            visible: {
                min: 2,
                max: 5
            }
        },
        swipe       : {
            onTouch    : true,
            onMouse    : true,
        },
        scroll : 1,
        prev:{button:"#prevItem"}, 
        next:{button:"#nextItem"}    
    });
   
});

