function CzyJestTakiZnak(znak, ciag, haslo){
    for (i = 0; i < haslo.length; i++)
        if (haslo[i] == znak[0]){
            ciag = ciag.substr(0, i) + znak[0] + ciag.substr(i + 1);
        }
    return(ciag);
}