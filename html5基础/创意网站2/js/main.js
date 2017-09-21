/**
 * Created by Yancy on 2017/9/5.
 */
var curId = 0;
var arrScene = ["home", "about", "service", "portfolio"];
var arrColor = ["#3498db", "#9b59b6", "#e67e22", "#1abc9c"];
$(document).ready(function () {
    $('.main-link').each(function (index) {
        $(this).attr('index', index);
        $('#' + arrScene[index]).css('opacity', 0);
        $(this).click(function (e) {
            e.preventDefault();
            if (curId !== $(this).attr('index') && !TweenMax.isTweening($('body'))) {
                TweenMax.to($('#' + arrScene[curId]), 0.5, {top: '100%', opacity: 0});
                curId = $(this).attr('index');
                TweenMax.to($('body'), 0.5, {backgroundColor: arrColor[curId]});
                TweenMax.to($('#' + arrScene[curId]), 0.5, {top: 0, opacity: 1, delay: 0.5});
            }
        });
    });
    TweenMax.to($('#home'), 1, {opacity: 1});

    $(window).resize(function () {
        resizePage();
    });
    function resizePage() {
        $('#about').css('padding-top',$(window).height()*0.35+'px');
        $('#service').css('padding-top',$(window).height()*0.30+'px');
        $('#portfolio').css('padding-top',$(window).height()*0.35+'px');
    }
    resizePage();
    
    $('.portfolio-link').each(function (index) {
        $(this).attr('index',index+1);
        $(this).click(function (e) {
            e.preventDefault();
            $('#popup').addClass('show');
            $('#popup-content').addClass('show');
            $('#popup-holder').html($('#work'+$(this).attr('index')).html());
        });
    });
    $('#close,#popup-bg').click(function () {
        $('#popup').removeClass('show');
        $('#popup-content').removeClass('show');
    })
});