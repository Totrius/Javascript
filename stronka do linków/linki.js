let naszText = "";
window.addEventListener("DOMContentLoaded", start);
function start() 
{
    odczytZPliku();
}

function odczytZPliku() {
    document.getElementById('inputfile')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                naszText=fr.result;
            }
              
            fr.readAsText(this.files[0]);
        })
}
function obrobka() {
    naszText = naszText.split('\n');
    for (let i = 0; i < naszText.length; i++) 
    {
        if (naszText[i].startsWith('<li><a href')) 
        {
            naszText[i] = naszText[i].replace('<li><a href="', '');
            naszText[i] = naszText[i].replaceAll('</li>', '');
            naszText[i] = naszText[i].replaceAll('</a>', '');
            
        } else {
            naszText.splice(i,1);
            i--; 
        }
    }
}
function wyswietl() 
{
    let efekt = '';
    for (let i = 0; i < naszText.length; i++) 
    {
        naszText[i] = naszText[i].split('">');
        efekt = efekt + `<div> ${naszText[i][0]} </div> </br>`;
    }
    document.getElementById("linki").innerHTML = efekt;
}
function alternatywa() 
{
    naszText = naszText.split('\r\n');
    for (let i = naszText.length-1; i >= 0; i--) 
    {
        if (naszText[i].startsWith('<li><a href')) 
        {
            naszText[i] = naszText[i].replaceAll('<li>', '');
            naszText[i] = naszText[i].replaceAll('</li>', '');
        } else {
            naszText =naszText.splice(i,1);
        
        }
    }
    let efekt = '';
    for (let i = 0; i < naszText.length; i++) {
        efekt = efekt + naszText[i] + "</br>";
    }
    document.getElementById("linki").innerHTML = efekt;
}
