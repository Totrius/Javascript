function start() {
    generujPlansze();
}
window.addEventListener("DOMContentLoaded", start);
function generujPlansze (){
    let plansza = '';
    let id = '';
    for (let j = 0; j < 4; j++) { //y
        for (let i = 0; i < 4; i++) { //x
            id = `pole${i}${j}`;
            plansza += `<div id="${id}" class ="pole">2</div>`;
        }
        plansza += `<div style="clear: both;"></div>`;        
    }
    document.getElementById('plansza').innerHTML=plansza;
}