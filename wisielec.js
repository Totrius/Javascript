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
 "nawigacja",
 "arachnofobia",
 "rekonwalescencja",
 "resocjalizacja",
 "kontrefekt",
 "familiant",
 "wyranżerowawszy",
 "rozentuzjazmowany",
 "wypatroszona żaba",
 "nastroszenie jeżozwierza",
 "fenoloftaleina",
 "proletariat",
 "interdyscyplinarny",
 "immanencja",
 "systematyzacja",
 "wielobranżowy",
 "strukturyzacja",
 "solenizant",
 "bynajmniej",
 "lawirantka",
 "knajak",
 "nietuzinkowy",
 "empiryczny",
 "androgeniczny",
 "pejoratywny",
 "eklektyczny",
 "spolegliwy",
 "wysublimowany",
 "bezprecedensowy",
 "enigmatyczny",
 "pruderyjny",
 "paradygmat",
 "semantyczny",
 "alegoria",
 "konfabulacja",
 "konotacja",
 "kompilacja",
 "behawioralny",
 "adekwatny",
 "tabula rasa",
 "ergonomiczny",
 "deprecjonować",
 "rewizja",
 "etymologia",
 "zbić z pantałyku",
 "dialektologia",
 "słowotwórstwo",
 "neologizm",
 "frazeologizm",
 "językoznawstwo",
 "morfologia",
 "krzyżówka",
 "mistycyzm",
 "metafizyka",
 "zootechnika",
 "psychologia",
];
window.addEventListener("DOMContentLoaded", start);
let haslo = baza[Math.floor(Math.random()*baza.length)];
haslo = haslo.toUpperCase();
const liczbaProb = 9;
let dlugosc = haslo.length;
let ukryteHaslo = "";
let ile_skuch = 0;

const dobrze = new Audio("dobrze.wav");
const zle = new Audio("zle.wav");

for (let i=0; i<dlugosc; i++)
{
	if(haslo.charAt(i) == " ") 
	{
		ukryteHaslo = ukryteHaslo + " ";
	}
	else 
	{
		ukryteHaslo = ukryteHaslo + "_";
	}
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerText = ukryteHaslo;
}



const litery = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ".split("");

function start()
{
	
	let tresc_diva = "";
	
	for (let i=0; i<=34; i++)
	{
		let element = "lit" + i;
		tresc_diva = tresc_diva + `<div id="${element}" class="litera" onclick="sprawdz(${i})"> ${litery[i]} </div>`;
		if ((i+1)%7 == 0)
		{
			tresc_diva = tresc_diva + '<div style="clear: both;"></div>';
		}
	}
	
	document.getElementById("klawiatura").innerHTML = tresc_diva;
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1)
	{
		return this.toString();
	}
	else 
	{
		return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
	}
}

function sprawdz(nr)
{
	
	let trafiona = false;
	
	for(let i=0; i<dlugosc; i++)
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
		const idElementu = "lit" + nr;
		const element = document.getElementById(idElementu);
	
		element.style.background = "#003300";
		element.style.color = "#00C000";
		element.style.border = "3px solid #00C000";
		element.style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		zle.play();
		const idElementu = "lit" + nr;
		const element = document.getElementById(idElementu);
		element.style.background = "#330000";
		element.style.color = "#C00000";
		element.style.border = "3px solid #C00000";
		element.style.cursor = "default";
		element.setAttribute("onclick", ";");
		
		ile_skuch++;
		let obraz = "img/s" + ile_skuch + ".jpg"
		document.getElementById("szubienica").innerHTML = `<img src="${obraz}"alt=""/>`
		
	}
	//wygrana
	if (haslo == ukryteHaslo)
	{
		document.getElementById("klawiatura").innerHTML = "Tak jest! Podano prawidłowe hasło! " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
	}
	//porażka
	if (ile_skuch >= liczbaProb)
	{
		document.getElementById("klawiatura").innerHTML = "Przrgrana, nie udało się zgadnąć hasła: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
	}
}
