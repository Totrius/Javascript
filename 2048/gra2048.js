let tablicaWartosci = [];
const kolejneLiczby = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
function start() {
    generujPlansze();
    dodajDwojke();
    dodajDwojke();
}
window.addEventListener("DOMContentLoaded", start);
function generujPlansze() {
    let plansza = '';
    let id = '';
    for (let i = 0; i < 16; i++) {
        if(i%4 == 0){
            plansza += `<div style="clear: both;"></div>`;
        }
        id = `pole${i}`;
        plansza += `<div id="${id}" class ="pole">0</div>`;
        tablicaWartosci[i] = 0;       
    }
    document.getElementById('plansza').innerHTML=plansza;
}
function dodajDwojke() {
    let losowePole = Math.floor(Math.random()*16);
    while(tablicaWartosci[losowePole]!=0){
        losowePole = Math.random()*16;
    }
    zmienWartosc(losowePole, 2);
}
function zmienWartosc(nrPola, wartosc) {
    let kolor = '';
    tablicaWartosci[nrPola] = wartosc;
    switch (wartosc) {
        case 0:
            kolor = `#000`;
            break;
        case 2:
            kolor = '#fff';
            break;
        case 4:
            kolor = `#00d989`;
            break;
        case 8:
            kolor = `#ff1867`;
            break;
        case 16:
            kolor = `#51ff0d`;
            break;
        case 32:
            kolor = `#00ffff`;
            break;
        case 64:
            kolor = `#ff5f00`;
            break;
        case 128:
            kolor = `#ff72e6`;
            break;
        case 256:
            kolor = `#1e9bff`;
            break;
        case 512:
            kolor = `#ff0000`;
            break;
        case 1024:
            kolor = `#ffff00`;
            break;        
    } 
    let element = document.getElementById(`pole${nrPola}`);
    element.innerText = wartosc;
    element.style.color = kolor;
    element.style["box-shadow"] = `0 0 35px ${kolor}`;
    element.style.border= `1px solid ${kolor}`;
    if (wartosc == 0){
        element.style.border= `1px solid #fff`;
    }
}
function przesuniecie(kierunek) {
    let poczatek, skokLinii, skokPola, nrPola;
    switch (kierunek){
        case 'lewo':
            poczatek = 0;
            skokLinii = 4;
            skokPola = 1
            break;
        case 'prawo':
            poczatek = 3;
            skokLinii = 4;
            skokPola = -1;
            break;
        case 'dol':
            poczatek = 12;
            skokLinii = 1;
            skokPola = -4;
            break;
        case 'gora':
            poczatek = 0;
            skokLinii = 1;
            skokPola = 4;
            break;
    }
    for (let i = 0; i<4; i++){
        //nr pola = poczatek + i*skokLinii +j*skokPola
        for (let k = 0; k<3; k++){
            for (let j = 1; j < 4; j++){
                 nrPola = poczatek + i*skokLinii + j*skokPola;
                 if(tablicaWartosci[nrPola-skokPola]==0 && tablicaWartosci[nrPola]!=0){
                    zmienWartosc((nrPola-skokPola), tablicaWartosci[nrPola]);
                    zmienWartosc(nrPola, 0);
                 }
            }
        }
    }
}