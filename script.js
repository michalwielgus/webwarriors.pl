$(window).load(function(){
  $('#preloader').delay('100').fadeOut('slow',function(){$(this).remove();});
})

$(document).ready(function() {
  $('#menu').slicknav();
  // Wjezdzanie napisow bo zaladowaniu strony
  $( "#landing-page-content" ).animate({ left:0 }, 500);

  // Zamykanie lightboxa ESC
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".lightbox").removeClass('lightbox_display');
      $("body").removeClass("block-scroll");
    }  // escape key maps to keycode `27`
  });

  // Animacje dla duzych ekranow po wejsciu danej sekcji
  $(window).on('load resize', function(){
    var wWidth = $('.width-checker').width();
    if(wWidth >700) {
      $(window).scroll(function(){
        var pozycja = $("#jak-pracujemy").offset().top;
        var portfolio_pozycja = $("#portfolio").offset().top;
        var zespol_pozycja = $("#zespol").offset().top;

        // Animacja dla "JAK PRACUJEMY?"
        if ($(this).scrollTop()>pozycja-400) {
          $(".podpunkty-1").animate({ left:0 }, 700);
          $( ".podpunkty-2" ).animate({ bottom:0 }, 700);
          $( ".podpunkty-3" ).animate({ right:0 }, 700);
          $( ".tytul-praca").animate({ top:0 }, 300);
        }
        //Animacja dla "PORTFOLIO"
        if($(this).scrollTop()>portfolio_pozycja-300) {
          $( "#portfolio").animate({ opacity: 1.0 }, 300);
        }
        //Animacja dla "ZESPOL"
        if($(this).scrollTop()>zespol_pozycja-300) {
          $(".zespol-podpunkt").transition({rotateY: '360deg'});
        }
      });
    }
  });
  //koniec animacji dla duzych

  //Wywolanie lightboxa
  $("#portfolio>a").click(function(){
    var lightbox_id = $(this).attr("href");
    $("div"+lightbox_id).addClass('lightbox_display');
    $("body").addClass("block-scroll");
  });
  //koniec wyowolania lightboxa

  //Zamkniecie okna lightboxa przyciskiem
  $(".close_button a").click(function(){
    $(".lightbox").removeClass('lightbox_display');
    $("body").removeClass("block-scroll");
  });
  //koniec zamkniecia

  //Ustawienie minusa na menu w animacji scrollowania
  $(window).on('load resize', function(){
    var positions = setMovePosition();
    duze = positions[0];
    male = positions[1];
  });
  //koniec ustawienia
  $("#menu a, #header a, #landing-page a").click(function(event){
    if ($('.width-checker').width() > 640){
      event.preventDefault();
    }

    var id = $(this).attr("href");
    var headerHeight = $("div#header").height();
    var czyMale = $("#header").attr("class")

    if(!czyMale){
      $("html, body").stop(true,true).animate({scrollTop: $(id).position().top - duze}, 600);
    }
    else {
      $("html, body").stop(true,true).animate({scrollTop: $(id).position().top - male}, 600);
    }
  });
  //scrollowanie do zadanej pozycji

  //przelaczenie menu na fixed
  var nav = $('#header');
  $(window).scroll(function () {
    wHeight = $(window).height()
    wHeight = wHeight - ( wHeight/1.3)

    if ($(this).scrollTop() > wHeight) {
      nav.addClass("f-nav");
    }
    else {
      nav.removeClass("f-nav");
    }
  });
  $('button').click(function(event){
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    email = $('input[name=email]').val();
    walidacja_email = re.test(email);
    if($('input[name=name]').val() && walidacja_email == true && $('textarea[name=tresc]').val()){
      event.preventDefault();
      showConfirm();
    }
  });

  $('input, textarea').focus(function(){
    if($('.confirm-message')){
      $('.confirm-message').remove();
    }
  });
});



function setMovePosition() {
  if($('.width-checker').width() > 900){
    var duze = 230;
    var male = 88;
  }
  else {
    var duze = 360;
    var male = 183;
  }
  return [duze, male];
}

function showConfirm(){
  $.ajax({
        type     : "POST",
        url      : "http://webwarriors.pl/mail.php",
        data     : {
          name : $('input[name=name]').val(),
          email : $('input[name=email]').val(),
          message: $('textarea[name=tresc]').val()
        },
        success : function(msg) {
          if(!($('.kontakt_prawa p').hasClass('confirm-message'))) {
            $('.kontakt_prawa').append('<p class="confirm-message">Dziękuję. Wiadomość wylądowała w mojej skrzynce!</p>');
            $("form")[0].reset();
          }

        }
      }
  );
}
