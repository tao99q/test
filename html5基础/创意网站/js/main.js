$(document).ready(function () {
  $(window).resize(function () {
    resizePage();
  });

  function resizePage() {
    $('#about').css('padding-top', $(window).height() * 0.35 + 'px');
    $('#service').css('padding-top', $(window).height() * 0.3 + 'px');
    $('#portfolio').css('padding-top', $(window).height() * 0.35 + 'px');
  }

  resizePage();
  var curid = 0;
  var arrScene = ['home', 'about', 'service', 'portfolio'];
  var arrColor = ['#3498db', '#9b59b6', '#e67e22', '#1abc9c'];

  $('.main-link').each(function (index) {
    $(this).attr('index', index);
    $('#' + arrScene[index]).css('opacity', 0);
    $(this).click(function (e) {
      e.preventDefault();
      if (!TweenMax.isTweening($('body')) && curid !== $(this).attr('index')) {
        TweenMax.to($('#' + arrScene[curid]), 0.5, {top: '100%', opacity: 0});
        curid = $(this).attr('index');
        TweenMax.to($('body'), 1, {backgroundColor: arrColor[curid]});
        TweenMax.to($('#' + arrScene[curid]), 0.5, {top: '0', opacity: 1, delay: 0.5});
      }
    })
  });
  TweenMax.to($('#home'), 1, {opacity: 1});

  $('.portfolio-link').each(function (index) {
    $(this).attr('index', index + 1);
    $(this).click(function (e) {
      e.preventDefault();
      $('#popup').addClass('show');
      $('#popup-content').addClass('show');
      $('#popup-holder').html($('#work' + $(this).attr('index')).html());
    });
  });
  $('#close,#popup-bg').click(function (e) {
    e.preventDefault();
    $('#popup').removeClass('show');
    $('#popup-content').removeClass('show');
  });
});