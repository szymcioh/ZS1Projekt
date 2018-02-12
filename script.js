var haslo = "";

function czyJestTakiZnak(znak, ciag){
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