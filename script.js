var haslo = "";
var bledy = 0;

$(document).ready(function(){
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
