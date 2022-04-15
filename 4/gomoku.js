window.addEventListener("DOMContentLoaded", start);
let gracz = 0;
let mojaPlansza = [];
function start() 
{
    utworzPlansze();
    utworzTablice();    
}
function utworzTablice() 
{
    for (let i = 0; i < 55; i++) {
        mojaPlansza[i]=[];
        for (let j = 0; j < 30; j++) {
            mojaPlansza[i][j]="Q";
        }
        
    }
    
}
function utworzPlansze ()
{
    let pola = "";
    for (let i=0; i<30; i++)
	{
        for (let j = 0; j < 55; j++) {
            let element = `pole[${j}][${i}]`;
            pola = pola + `<div id="${element}" class ="kratka" onclick="wstawZnak(${j},${i})"></div>`;    
        }
        pola = pola + `<div style="clear: both;"></div>`;
		
	}
	
	document.getElementById("plansza").innerHTML = pola;

}
function wstawZnak(x,y) 
{
    gracz = gracz%2;
    const idPola = `pole[${x}][${y}]`;
    const pole = document.getElementById(idPola);
    switch (gracz) {
        case 0:
            pole.innerText = "X";
            mojaPlansza[x][y] = "X";
            break;
        case 1:
            pole.innerText = "O";
            mojaPlansza[x][y] = "O";
            break;
    }
    pole.setAttribute("onclick",";");
    pole.style.cursor="default";
    gracz++;

    switch (gracz) {
        case 1:
            document.getElementById("naglowek").innerText = "Witaj w Gomoku!  Obecnie kolej:   O";
            break;
    
        case 2:
            document.getElementById("naglowek").innerText = "Witaj w Gomoku!  Obecnie kolej:   X";
            break;
    }
    czyWygrana(x,y);
}
function czyWygrana(x,y) 
{
    let poziom = [],
        pion = [],
        skosMalejacy = [],
        skosRosnacy = [];
    const znak = mojaPlansza[x][y];
    for (let i = 0; i < 5; i++) 
    {
        poziom.fill(false);
        pion.fill(false);
        skosMalejacy.fill(false);
        skosRosnacy.fill(false);
        for (let j = 0; j < 5; j++) 
        {
            // warunek na poziom
            if (mojaPlansza[x-4+i+j][y] == znak) 
            {
                poziom[j] = true;
            }
            // warunek na pion
            if (mojaPlansza[x][y-4+i+j] == znak) 
            {
                pion[j] = true;
            }
            // warunek na skos malający
            if (mojaPlansza[x-4+i+j][y-4+i+j] == znak) 
            {
                skosMalejacy[j] = true;
            }
            // warunek na skos rosnący
            if (mojaPlansza[x-4+i+j][y+4-i-j] == znak) 
            {
                skosRosnacy[j] = true;
            }
        }
        if (poziom[0] && poziom[1] && poziom[2] && poziom[3] && poziom[4]) 
        {
            alert("WYGRANA!!! poziom");    
        }
        else if (pion[0] && pion[1] && pion[2] && pion[3] && pion[4]) 
        {
            alert("WYGRANA!!! pion");    
        }
        else if (skosMalejacy[0] && skosMalejacy[1] && skosMalejacy[2] && skosMalejacy[3] && skosMalejacy[4]) 
        {
            alert("WYGRANA!!! skosMalejacy");    
        }
        else if (skosRosnacy[0] && skosRosnacy[1] && skosRosnacy[2] && skosRosnacy[3] && skosRosnacy[4]) 
        {
            alert("WYGRANA!!! skosRosnacy");    
        }
    }  
    
}


