/**
 * Created by wallace on 30/12/2014.
 */

(function ( $ ) {

    var settings ={};
    $.fn.freskin = function( options ) {

        // This is the easiest way to have default options.
        settings = $.extend({
            "z-index":2000
        }, options );

        if($('#freskinHighlight').length==0){

            $('body').append('<div id="freskinHighlight" ></div>')
                .append('<div style="position: fixed;display: none;"></div>');
        }

        return this;

    };

    $.fn.freskinShow = function() {

        $('#freskinHighlight').show().next().css('z-index',settings['z-index']);

        console.log(this);
        var targetEl = $(this);
        var left = targetEl.offset().left;

        var scrollTop     = $(window).scrollTop(),
            top = targetEl.offset().top,
            distance      = (top - scrollTop);


        if(settings.reshape){
            settings.reshape($('#freskinHighlight'));
        }else{
            $('#freskinHighlight').css({
                top: distance-10, left: left-10, 'border-radius': '10%',
                width: (parseInt(targetEl.css('width').replace('px',''))+20) + 'px',
                height: (parseInt(targetEl.css('height').replace('px',''))+20) + 'px'
            });
        }

        $('#freskinHighlight').css({top: distance-10, left: left-10, 'border-radius': '10%'}).show();

        if(settings.message){
            var msgEl = $('#freskinHighlight').next();
            msgEl.empty().append(settings.message);

            msgEl.css({top: ($('#freskinHighlight').offset().top + parseInt($('#freskinHighlight').css('height').replace('px','')))
                , left: left-10,
            'z-index':$('#freskinHighlight').css('z-index')});


            if(settings.messageClass){
                msgEl.addClass(settings.messageClass);
            }
            msgEl.show();
        }

        if(settings.time){
            setTimeout(function(){
                $.fn.freskinHide();
            },settings.time*1000);
        }
    };

    $.fn.freskinHide = function( options ) {
        $('#freskinHighlight').hide().next().hide();

    };

}( jQuery ));


/*<div id="freskinHighlight" ></div>
<div class="alert alert-info" role="alert" style="z-index: 2000;position: fixed;display: none;">
<button ></button>
</div>
*/


