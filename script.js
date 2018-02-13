var haslo = "";
const alfabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż']

function czyJestTakiZnak(znak){
    for (i = 0; i < haslo.length; i++)
        if (haslo[i] == znak[0]){
            ciag = ciag.substr(0, i) + znak[0] + ciag.substr(i + 1);
        }
    return(ciag);
}

function wprowadzHaslo(){
    var str = '';
    haslo = document.getElementById("wprowadz_haslo").value;
    document.getElementById('div wprowadz haslo').style.visibility = "hidden";
    document.getElementById('div zgadywanie').style.visibility = "visible";
    for (i = 0; i < haslo.length; i++)
        str += '_';
    document.getElementById('haslo1').innerHTML = str;
}

function tworzenieButtonow(){
    for (i = 0; i < alfabet.length; i++){
        document.getElementById("div przyciski").innerHTML += "<button class='przyciskiLiter' onclick='czyJestTakiZnak('" + alfabet[i] + "')'></button>"
    }
}

