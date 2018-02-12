function CzyJestTakiZnak(znak, ciag, haslo){
    for (i = 0; i < haslo.length; i++)
        if (haslo[i] == znak[0])
            ciag = ciag[i].replace(ciag[i], znak[0]);
    return(ciag);
}