// let baza = new Array(14);
const baza = [
	"Bez pracy nie ma kołaczy",
	"żółć",
	"antyterrorystyczna grupa świerszczy",
	"imperialistyczne frankfurterki",
	"aleksandryjskie królestwo chusteczek",
	"frywolne zakonnice",
	"hegemonistyczne zapędy kuropatw",
	"pięćdziesięciogroszówka",
	"dźwiękonaśladownictwo",
	"nogogłaszczki",
	"transcendentalia",
	"liczba zmiennoprzecinkowa",
	"prawdopodobieństwo",
	"błąd paralaksy",
];

const liczba_prob = 9;

// window.onload = start;
window.addEventListener("DOMContentLoaded", start);

// let haslo = baza[Math.floor(Math.random()*14)];
let haslo = baza[Math.floor(Math.random() * baza.length)];
haslo = haslo.toUpperCase();


const dlugosc = haslo.length;
let ukryteHaslo = "";
let ile_skuch = 0;

// let dobrze = new Audio("dobrze.wav");
// let zle = new Audio("zle.wav");
const dobrze = new Audio("dobrze.wav");
const zle = new Audio("zle.wav");

// for (i=0; i<dlugosc; i++)
for (let i=0; i<dlugosc; i++)
{
	if(haslo.charAt(i) == " ") 
	{
		ukryteHaslo = ukryteHaslo + " ";
		// ukryteHaslo += " ";
	}
	else 
	{
		ukryteHaslo = ukryteHaslo + "_";
	}
}

function wypisz_haslo()
{
	// document.getElementById("plansza").innerHTML = ukryteHaslo;
	document.getElementById("plansza").innerText = ukryteHaslo;
}



const litery = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ".split("");

// koniec na dziś

moje_guziki = [];
function start()
{
	let tresc_diva = "";

	// for (i=0; i<=34; i++)
	for (let i=0; i<=34; i++)
	{
		const element = "lit" + i;
		// let element = "lit" + i;

		// tresc_diva = tresc_diva + '<div id="'+element+'" class="litera" onclick="sprawdz('+i+')">' + litery[i] + '</div>';
				tresc_diva = tresc_diva + `<div id="${element}" class="litera" onclick="sprawdz(${i})">${litery[i]}</div>`; //template literal


		if ((i+1)%7 == 0)
		{
			tresc_diva = tresc_diva + '<div style="clear: both;"></div>';
		}
	}

	document.getElementById("klawiatura").innerHTML = tresc_diva;
	wypisz_haslo();
	
	document.getElementById("chowaj_popup").addEventListener("click", function(){
		document.getElementById("popup").style = "display: none";
	})
}



//NIE WOLNO TAK ROBIĆ!@@@@!!!!
String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1)
	{
		return this.toString();
	}
	else 
	{
		return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
		// return `${this.substr(0, miejsce)}${znak}${this.substr(miejsce+1)}`; //można, ale po co?
		
	}
}

function sprawdz(nr)
{
	let trafiona = false;
	
	for(i=0; i<dlugosc; i++) // TODO: Znajdź błąd
	{
		if (haslo.charAt(i) == litery[nr])
		{
			ukryteHaslo = ukryteHaslo.ustawZnak(i, litery[nr]);
			trafiona = true;
		}
	}
	if	(trafiona == true)
	{
		dobrze.play();
		const id_elementu = "lit" + nr;
		const element = document.getElementById(id_elementu);
	
		//można zastosować klasę CSS
		element.style.background = "#003300";
		element.style.color = "#00C000";
		element.style.border = "3px solid #00C000";
		element.style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		zle.play();
		let element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick", ";");
		
		ile_skuch++;
		let obraz = "img/s" + ile_skuch + ".jpg"
		document.getElementById("szubienica").innerHTML = '<img src="' + obraz + '"alt=""/>'
		//document.getElementById("obrazek").src = obraz; //lepiej tak! (tylko dodaj atrybut id do obrazka)
		
	}
	//wygrana
	if (haslo == ukryteHaslo)
	{
		document.getElementById("klawiatura").innerHTML = "Tak jest! Podano prawidłowe hasło! " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
		/* gotowy kawałek w HTMLu który tylko się pokazuje (na brudno)
		document.getElementById("wygrana").style ="";
		document.getElementById("haslo").innerText = haslo;
		document.getElementById("klawiatura").style = "display:none";
		*/
	}
	//porażka
	if (ile_skuch >= liczba_prob)
	{
		document.getElementById("klawiatura").innerHTML = "Przrgrana, nie udało się zgadnąć hasła: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
	}
}


