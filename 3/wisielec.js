let baza = new Array(14);
baza[0] = "Bez pracy nie ma kołaczy";
baza[1] = "żółć";
baza[2] = "antyterrorystyczna grupa świerszczy";
baza[3] = "imperialistyczne frankfurterki";
baza[4] = "aleksandryjskie królestwo chusteczek";
baza[5] = "frywolne zakonnice";
baza[6] = "hegemonistyczne zapędy kuropatw";
baza[7] = "pięćdziesięciogroszówka";
baza[8] = "dźwiękonaśladownictwo";
baza[9] = "nogogłaszczki";
baza[10] = "transcendentalia";
baza[11] = "liczba zmiennoprzecinkowa";
baza[12] = "prawdopodobieństwo";
baza[13] = "błąd paralaksy";
window.onload = start;
let haslo = baza[8];//baza[Math.floor(Math.random()*14)];
haslo = haslo.toUpperCase();

let dlugosc = haslo.length;
let haslo1 = "";
let ile_skuch = 0;

let dobrze = new Audio("dobrze.wav");
let zle = new Audio("zle.wav");

for (i=0; i<dlugosc; i++)
{
	if(haslo.charAt(i) == " ") 
	{
		haslo1 = haslo1 + " ";
	}
	else 
	{
		haslo1 = haslo1 + "_";
	}
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}



const litery = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ".split("");

function start()
{
	
	let tresc_diva = "";
	
	for (i=0; i<=34; i++)
	{
		let element = "lit" + i;
		tresc_diva = tresc_diva + '<div id="'+element+'" class="litera" onclick="sprawdz('+i+')">' + litery[i] + '</div>';
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
	
	for(i=0; i<dlugosc; i++)
	{
		if (haslo.charAt(i) == litery[nr])
		{
			haslo1 = haslo1.ustawZnak(i, litery[nr]);
			trafiona = true;
		}
	}
	if	(trafiona == true)
	{
		dobrze.play();
		let element = "lit" + nr;
	
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
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
		
	}
	//wygrana
	if (haslo == haslo1)
	{
		document.getElementById("klawiatura").innerHTML = "Tak jest! Podano prawidłowe hasło! " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
	}
	//porażka
	if (ile_skuch >= 9)
	{
		document.getElementById("klawiatura").innerHTML = "Przrgrana, nie udało się zgadnąć hasła: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()"> JESZCZE RAZ??</span>';
	}
}