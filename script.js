var haslo = "";
var bledy = 0;

$(document).ready(function(){ //Poczatek gotowca do animacji ("tylko frajery korzystaja z gotowcow" - Szymon Horzela)
  var $hang = $(".hang"),
      xPos,
      yPos;
  $(document).on("mousedown", ".hang", function(evt) {
    $hang = $(this),
    $(this).addClass("active").removeClass("transitioned");
    var realTop = parseInt($(this).offset().top, 10),
        realLeft = parseInt($(this).offset().left, 10);
    xPos = evt.pageX - realLeft;
    yPos = evt.pageY - realTop;

    $(document).on("mousemove", function(e) {
      if ($hang.hasClass("active")) {
        var x = e.pageX,
            y = e.pageY,
            realX = x -xPos,
            realY = y - yPos,
            newX = realX - realLeft,
            newY = realY - realTop;
        $hang.css("transform", "translateX("+ newX +"px) translateY("+ newY +"px)");
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
      if ($hang.hasClass("active")) {
        $hang.removeClass("active").addClass("transitioned");
        if (newX || newY) {
          $hang.css("transform", "translateX("+ (newX - dispX) +"px) translateY("+ (newY - dispY) +"px)");
          setTimeout(function() {
            $hang.css("transform", "translateX("+ (newX + dispX) +"px) translateY("+ (newY + dispY) +"px)");
          }, 380);
          setTimeout(function() {
            $hang.css("transform", "translateX("+ smallX +"px) translateY("+ smallY +"px)");
          }, 420);
          setTimeout(function() {
            $hang.css("transform", "translateZ(0)");
          }, 700);
        }
      }
    }

    $(document).on("mouseup", function(e) {
      mouseUpFunc(e);
    });

    return false; 
  });
  //Koniec gotowca
    
    $("#password_button").click(function(){
        var wrongPass = $("#wprowadz_haslo")
        if(wrongPass.val() != ""){
            var diviniation = $("#password");
            diviniation.animate({
                left: '-1500px'
            },1000, function() {
                diviniation.hide(); 
            });	
            wprowadzHaslo();
            document.getElementById('guess').style.display = "flex";
            document.getElementById('buttons').style.display = "flex";
            var showUp1 = $("#guess");
            var showUp2 = $("#buttons_background");
            
            setTimeout(function(){
                showUp1.animate({
                    left: '0'
                });
                showUp2.animate({
                    left: '0%'
                });
            }, 200);
        }
        else
            $("#password").effect( "shake", {times:2}, 750 );
    });
    
    $(".alphabet").click(function(){
        var diviniation = $(this);
        if (czyJestTakiZnak(diviniation.html()))
            diviniation.addClass('alphabetTrue');
        else
            diviniation.addClass('alphabetFalse');
    });
    
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