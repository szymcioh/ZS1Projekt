var haslo = "";
var bledy = 0;

$(document).ready(function(){ 
   $('img').on('dragstart', function(event) { event.preventDefault(); }); 
    var listaObiektow = [];
    var chosed;
    var chosedSpec;
    var wybranoObiekt = false;
    var mouseX, mouseY = 0;
    responsywnoscWisielca();
    zapisPozycji();
      
    function responsywnoscWisielca(){
        var ośY = 0;
        $("#head").css("left", ośY - $("#head").width()/2);
        $("#head").css("top", '0');

        $("#stomach").css("left", ośY - $("#stomach").width()/2);
        $("#stomach").css("top", $("#head").height());

        $("#handL").css("left", ośY + ($("#stomach").width()/2) * 0.75);
        $("#handL").css("top", $("#head").height());

        $("#handR").css("left", ośY - $("#stomach").width());
        $("#handR").css("top", $("#head").height());

        $("#legR").css("left", ośY - $("#stomach").width());
        $("#legR").css("top", $("#head").height() + $("#stomach").width());

        $("#legL").css("left", ośY + ($("#stomach").width()/2) * 0.75);
        $("#legL").css("top", $("#head").height() + $("#stomach").width());
    }
    
    function pozycjeStartowe(Id, X, Y) { //klasa przechowujaca informacje o obiektach wisielca
        this.Id = Id;
        this.X = X;
        this.Y = Y;
        console.log('Utworzono obiekt' + this.Id + 'o wspolrzednych(' + this.X + ' ' + this.Y + ')');
    }
    
    function zapisPozycji(){
        var i = 0;
        $(".hang").each(function(){  //tworzenie nowych obiektow klasy pozycjeStartowe i zapisywanie ich w tablicy
            var handle = $(this);
            obiekt = new pozycjeStartowe(handle.attr('id'), handle.position().left, handle.position().top);
            listaObiektow[i] = (obiekt);
            i++;
        });
    }
    
    $(window).resize(function() {
        responsywnoscWisielca();
        zapisPozycji();
    });
    
    $(".hang").mousedown(function(e){
        chosed = $(this);
        listaObiektow.forEach(function(entry) { //odnajdywanie klasy w ktorej zapisano informacje o wisielcu
            if(entry.Id == chosed.attr('id')){
                chosedSpec = entry;
            }
        });
        mouseX = e.pageX - chosedSpec.X; //odleglosc kursora myszki od obiektu w chwili nacisniecia przycisku
        mouseY = e.pageY - chosedSpec.Y;
        wybranoObiekt = true;
    });
    
    $(document).mouseup(function() {
        if (wybranoObiekt){
            powrotObiektu();
        }
    });
    
    $(document).mousemove(function(e){
        if(wybranoObiekt){  
            var newX = e.pageX - mouseX; //pozycja myszki - (pozycja myszki - bazowa pozycja) = nowa pozycja 
            var newY = e.pageY - mouseY;
            newX -= chosedSpec.X;
            newY -= chosedSpec.Y;
            if (Math.sqrt(newX*newX + newY*newY) > 800){
                powrotObiektu();
            }
            else{
                newX = chosedSpec.X + ((newX-(Math.abs(newX)*newX/1500))/2);
                newY = chosedSpec.Y + ((newY-(Math.abs(newY)*newY/1500))/2);
                chosed.css('left', newX);
                chosed.css('top', newY);
            }
        } 
    });
    
        
    
    function powrotObiektu(){
        var newX, newY;
        wybranoObiekt = false;
        var odlegloscX = chosed.position().left - chosedSpec.X;
        var pedX = odlegloscX / 4;
        
        var odlegloscY = chosed.position().top - chosedSpec.Y;
        var pedY = odlegloscY / 4;
        
        var timer1 = setInterval(function(){
            odlegloscX = chosed.position().left - chosedSpec.X;
            if (odlegloscX > 0){
                pedX = (pedX - 2) * 0.90;
            }    
            if(odlegloscX < 0){
                pedX= (pedX + 2) * 0.90;
            }
            newX = chosed.position().left + pedX;
            
            odlegloscY = chosed.position().top - chosedSpec.Y;
            if (odlegloscY > 0){
                pedY = (pedY - 2) * 0.90;
            }    
            if(odlegloscY < 0){
                pedY= (pedY + 2) * 0.90;
            }
            newY = chosed.position().top + pedY;
            
            chosed.css('top', newY);
            chosed.css('left', newX);
            
            
            
            $(".hang").each(function() {
                if ($(this).attr('id') != chosed.attr('id')){
                    var kolizje = $(chosed).collision($(this));
                    if ( !kolizje.is(':animated') ){
                        kolizje.animate({ "left": "+=" + pedX + "px", "top": "+=" + pedY + "px"  }, "fast" );
                        kolizje.animate({ "left": "-=" + pedX + "px", "top": "-=" + pedY + "px"  }, "fast" );
                    }
                }
            });
            delete kolizje;   
            
            if((Math.abs(pedX) < 5) && (Math.abs(odlegloscX) < 5) && (Math.abs(pedY) < 5) && (Math.abs(odlegloscY) < 5)){
                chosed.css('left', chosedSpec.X);
                chosed.css('top', chosedSpec.Y);
                clearInterval(timer1);
            }
        }, 20);
    }
    
    function log(text){
        document.getElementById("log").innerHTML += text + " ";
    }  
    
    
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
        else{
            diviniation.addClass('alphabetFalse');
            bledy ++;
            console.log(bledy);
        }
        pokazWisielca();
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

function pokazWisielca(){
    if(bledy==1){
        $('#head').css("visibility","visible");
    }
    if(bledy==2){
        $('#stomach').css("visibility","visible");
    }
    if(bledy==3){
        $('#handR').css("visibility","visible");
    }
    if(bledy==4){
        $('#handL').css("visibility","visible");
    }
    if(bledy==5){
        $('#legR').css("visibility","visible");
    }
    if(bledy==6){
        $('#legL').css("visibility","visible");
        $('#buttons').css("visibility","hidden");
        $('#guess').css("visibility","hidden");
        document.getElementById('loseOrWin').innerHTML ="Przegrałeś!"
    }
    
}