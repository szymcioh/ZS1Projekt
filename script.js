var haslo = "";
var bledy = 0;

$(document).ready(function(){ //Poczatek gotowca do animacji ("tylko frajery korzystaja z gotowcow" - Szymon Horzela)
  var $elementywisielca = $(".elementywisielca"),
      xPos,
      yPos;
  $(document).on("mousedown", ".elementywisielca", function(evt) {
    $(this).addClass("active").removeClass("transitioned");
    var realTop = parseInt($(this).offset().top, 10),
        realLeft = parseInt($(this).offset().left, 10);
    xPos = evt.pageX - realLeft;
    yPos = evt.pageY - realTop;

    $(document).on("mousemove", function(e) {
      if ($elementywisielca.hasClass("active")) {
        var x = e.pageX,
            y = e.pageY,
            realX = x -xPos,
            realY = y - yPos,
            newX = realX - realLeft,
            newY = realY - realTop;
        $elementywisielca.css("transform", "translateX("+ newX +"px) translateY("+ newY +"px)");
      };
    });

    function mouseUpFunc(e) {
      var x = e.pageX, 
          y = e.pageY,
          realX = x - xPos,
          realY = y - yPos,
          newX = parseInt(Math.floor((0 - (realX - realLeft))/3), 10),
          newY = parseInt(Math.floor((0 - (realY - realTop))/3), 10),
          smallX = parseInt(Math.floor((realX - realLeft)/5), 10),
          smallY = parseInt(Math.floor((realY - realTop)/5), 10),
          dispX = parseInt(Math.floor((realX - realLeft)/10), 10),
          dispY = parseInt(Math.floor((realY - realTop)/10), 10);
      if ($elementywisielca.hasClass("active")) {
        $elementywisielca.removeClass("active").addClass("transitioned");
        if (newX || newY) {
          $elementywisielca.css("transform", "translateX("+ (newX - dispX) +"px) translateY("+ (newY - dispY) +"px)");
          setTimeout(function() {
            $elementywisielca.css("transform", "translateX("+ (newX + dispX) +"px) translateY("+ (newY + dispY) +"px)");
          }, 380);
          setTimeout(function() {
            $elementywisielca.css("transform", "translateX("+ smallX +"px) translateY("+ smallY +"px)");
          }, 420);
          setTimeout(function() {
            $elementywisielca.css("transform", "translateZ(0)");
          }, 700);
        }
      }
    }

    $(document).on("mouseup", function(e) {
      mouseUpFunc(e);
    });

    return false; 
  });
});  //Koniec gotowca

    $("#password_button").click(function(){
        var diviniation = $("#password");
        diviniation.animate({
            left: '-1000px',
            height: 0,
            width: 0
        },400, function() {
            diviniation.hide();
        });
        wprowadzHaslo();
    });
    
    $(".alphabet").click(function(){
        var diviniation = $(this);
        if (czyJestTakiZnak(diviniation.html()))
            diviniation.removeClass('alphabet').addClass('alphabetTrue');
        else
            diviniation.removeClass('alphabet').addClass('alphabetFalse');
    });
    
    $( ".alphabet" ).hover(
      function() {
        $( this ).addClass( "alphabethover" );
      }, function() {
        $( this ).removeClass( "alphabethover" );
      }
    );
    
});

function czyJestTakiZnak(znak){
    var jest = false;
    var ciag = document.getElementById("haslo1").innerHTML;
    for (i = 0; i < haslo.length; i++)
        if (haslo[i] == znak){
            ciag = ciag.substr(0, i) + znak + ciag.substr(i + 1);
            jest = true;
        }
    document.getElementById("haslo1").innerHTML = ciag;
    return jest;
}



function wprowadzHaslo(){
        haslo = document.getElementById("wprowadz_haslo").value;
        haslo = haslo.toUpperCase();
        var str = '';
        document.getElementById('guess').style.visibility = "visible";
        document.getElementById('buttons').style.visibility = "visible";
        for (i = 0; i < haslo.length; i++)
            str += '_';
        document.getElementById('haslo1').innerHTML = str;

}

/*function tworzenieButtonow(){                     PORZUCONY PROJEKT FUNKCJI DO TWORZENIA PRZYCISKOW
    const alfabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż']
    for (i = 0; i < alfabet.length; i++){
        document.getElementById("div przyciski").innerHTML += "<button class='przyciskiLiter' onclick='czyJestTakiZnak('" + alfabet[i] + "')'></button>"
    }
}*/
