const liczbaKart = 12;

let karty = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];
let idKart = [];
for (let i = 0; i < liczbaKart; i++) {
    idKart[i]= document.getElementById(`c${i}`);
    idKart[i].addEventListener("click", function() {odslonKarty(i);})
    
}
 let jednaWidoczna = false;
 let licznikRund = 0;
 let widocznaKarta;
 let blokada = false;
 let pozostalePary = liczbaKart/2;

function odslonKarty(nr) 
{
    let obraz = `url(img/${karty[nr]})`;
    let widocznosc = $(idKart[nr]).css('opacity');

    if(widocznosc != 0 && blokada ==false)
    {
        blokada = true;
        $(idKart[nr]).css('background-image', obraz);
        $(idKart[nr]).addClass('kartaAktywna');
        $(idKart[nr]).removeClass('karta');

        if(!jednaWidoczna)
        {
            jednaWidoczna = true;
            widocznaKarta = nr;
            blokada = false;
        }
        else
        {
            licznikRund++;
            $('.punktacja').html(`Turn counter: ${licznikRund}`);
            jednaWidoczna = false;
            if (karty[widocznaKarta] == karty[nr]) 
            {
                setTimeout(function(){ukryjKarty(nr, widocznaKarta);}, 750);
            }
            else
            {
                setTimeout(function(){przywrocKarty(nr, widocznaKarta);}, 1000)
            }
        }


    }

    
}
function ukryjKarty(nr1, nr2) 
{
    $(idKart[nr1]).css('opacity', '0');
    $(idKart[nr2]).css('opacity', '0');

    pozostalePary--;
    blokada = false;

    if(pozostalePary == 0)
    {
        $('.tablica').html(`<h1>You win! <br> Done in ${licznikRund} turns`);
    }
}

function przywrocKarty(nr1, nr2)
{
    $(idKart[nr1]).css('background-image', 'url(img/karta.png)');
    $(idKart[nr1]).addClass('karta');
    $(idKart[nr1]).removeClass('kartaAktywna');

    $(idKart[nr2]).css('background-image', 'url(img/karta.png)');
    $(idKart[nr2]).addClass('karta');
    $(idKart[nr2]).removeClass('kartaAktywna');

    blokada = false;
}