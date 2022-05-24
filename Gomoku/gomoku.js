window.addEventListener("DOMContentLoaded", start);
let gracz = 0;
let mojaPlansza = [];
function start() 
{
    gracz = 0;
    document.getElementById("naglowek").innerText = "Witaj w Gomoku!  Obecnie kolej:   X";
    utworzPlansze();
    utworzTablice();  
    fajnaAnimacja();  
}
function utworzTablice() 
{
    for (let i = 0; i < 55; i++) {
        mojaPlansza[i]=[];
        for (let j = 0; j < 27; j++) {
            mojaPlansza[i][j]="Q";
        }
        
    }
    
}
function utworzPlansze ()
{
    let pola = "";
    for (let i=0; i<27; i++)
	{
        for (let j = 0; j < 55; j++) {
            let element = `pole[${j}][${i}]`;
            pola = pola + `<div id="${element}" class ="kratka" onclick="wstawZnak(${j},${i}, event)"></div>`;    
        }
        pola = pola + `<div style="clear: both;"></div>`;
		
	}
	
	document.getElementById("plansza").innerHTML = pola;

}
function wstawZnak(x,y, event) 
{
    console.log(event);
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
    createOrb({x:event.clientX, y:event.clientY});
    pole.setAttribute("onclick",";");
    pole.style.cursor="default";
    gracz++;
    document.getElementById("naglowek").setAttribute("onclick", "start()");
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
          alert("no wygrana jest");
            wygrana((x-4+i+0), y, (x-4+i+1), y, (x-4+i+2), y, (x-4+i+3), y, (x-4+i+4), y);     
        }
        else if (pion[0] && pion[1] && pion[2] && pion[3] && pion[4]) 
        {
            wygrana(x, y-4+i+0, x, y-4+i+1, x, y-4+i+2, x, y-4+i+3, x, y-4+i+4);    
        }
        else if (skosMalejacy[0] && skosMalejacy[1] && skosMalejacy[2] && skosMalejacy[3] && skosMalejacy[4]) 
        {
            wygrana(x-4+i+0, y-4+i+0, x-4+i+1, y-4+i+1, x-4+i+2, y-4+i+2, x-4+i+3, y-4+i+3, x-4+i+4, y-4+i+4);    
        }
        else if (skosRosnacy[0] && skosRosnacy[1] && skosRosnacy[2] && skosRosnacy[3] && skosRosnacy[4]) 
        {
            wygrana(x-4+i+0, y+4-i-0, x-4+i+1, y+4-i-1, x-4+i+2, y+4-i-2, x-4+i+3, y+4-i-3, x-4+i+4, y+4-i-4);    
        }
    }  
    
}

function wygrana(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
  let wygraneID = [`pole[${x1}][${y1}]`, `pole[${x2}][${y2}]`, `pole[${x3}][${y3}]`, `pole[${x4}][${y4}]`, `pole[${x5}][${y5}]`];
  let element;
  for (let i = 0; i < wygraneID.length; i++) {
    element = document.getElementById(wygraneID[i]);
    element.className = "pulse";
  }
  switch (gracz) {
    case 1:
        document.getElementById("naglowek").innerText = "Gratulacje, gracz X zwyciężył! Kliknij aby zagrać ponownie ;)";
        break;

    case 2:
        document.getElementById("naglowek").innerText = "Gratulacje, gracz O zwyciężył! Kliknij aby zagrać ponownie ;)";
        break;
}
}


function fajnaAnimacja() {
      let sketch = Sketch.create(),
      center = {
        x: sketch.width / 1.5,
        y: sketch.height / 1.5
      },
      orbs = [],    
      dt = 1,
      opt = {
        total: 0,
        count: 100,
        spacing: 2,
        speed: 65,
        scale: 1,
        jitterRadius: 0,
        jitterHue: 50,
        clearAlpha: 10,
        toggleOrbitals: true,
        orbitalAlpha: 100,
        toggleLight: true,      
        lightAlpha: 5,
        clear: function(){
          sketch.clearRect( 0, 0, sketch.width, sketch.height ),
          orbs.length = 0; 
        }
      };

  var Orb = function( x, y ){
    var dx = ( x / opt.scale ) - ( center.x / opt.scale ),
  	    dy = ( y / opt.scale ) - ( center.y / opt.scale );
    this.angle = atan2( dy, dx );
    this.lastAngle = this.angle;
  	this.radius = sqrt( dx * dx + dy * dy );
    this.size = ( this.radius / 300 ) + 1;
  	this.speed = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;
  };

  Orb.prototype.update = function(){  
    this.lastAngle = this.angle;
    this.angle += this.speed * ( opt.speed / 50 ) * dt;
    this.x = this.radius * cos( this.angle );
    this.y = this.radius * sin( this.angle );
  };

  Orb.prototype.render = function(){
    if(opt.toggleOrbitals){
      var radius = ( opt.jitterRadius === 0 ) ? this.radius : this.radius + random( -opt.jitterRadius, opt.jitterRadius );
     radius = ( opt.jitterRadius != 0 && radius < 0 ) ? 0.001 : radius;
      sketch.strokeStyle = 'hsla( ' + ( ( this.angle + 90 ) / ( PI / 180 ) + random( -opt.jitterHue, opt.jitterHue ) ) + ', 100%, 50%, ' + ( opt.orbitalAlpha / 100 ) + ' )';
      sketch.lineWidth = this.size;			
      sketch.beginPath();
      if(opt.speed >= 0){
        sketch.arc( 0, 0, radius, this.lastAngle, this.angle + 0.001, false );
      } else {
        sketch.arc( 0, 0, radius, this.angle, this.lastAngle + 0.001, false );
      };
      sketch.stroke();
      sketch.closePath();
    };

    if(opt.toggleLight){
      sketch.lineWidth = .5;
      sketch.strokeStyle = 'hsla( ' + ( ( this.angle + 90 ) / ( PI / 180 ) + random( -opt.jitterHue, opt.jitterHue ) ) + ', 100%, 70%, ' + ( opt.lightAlpha / 100 ) + ' )';
      sketch.beginPath();
      sketch.moveTo( 0, 0 );
      sketch.lineTo( this.x, this.y );
      sketch.stroke();
    };
  };

  var createOrb = function( config ){
    var x = ( config && config.x ) ? config.x : sketch.mouse.x,
        y = ( config && config.y ) ? config.y : sketch.mouse.y;
  	orbs.push( new Orb( x, y ) );
  };

  window.createOrb = createOrb;

  var turnOnMove = function(){
  	sketch.mousemove = createOrb;	
  };

  var turnOffMove = function(){
  	sketch.mousemove = null;	
  };

  sketch.mousedown = function(){
    createOrb();
    turnOnMove();
  };

  sketch.mouseup = turnOffMove;

  sketch.resize = function(){
    center.x = sketch.width / 2;
    center.y = sketch.height / 2;
    sketch.lineCap = 'round';
  };

  sketch.setup = function(){  
    while( opt.count-- ){
      createOrb( {
        x: random( sketch.width / 2 - 300, sketch.width / 2 + 300 ), 
        y: random( sketch.height / 2 - 300, sketch.height / 2 + 300 ) 
      } );
    };
  };

  sketch.clear = function(){
    sketch.globalCompositeOperation = 'destination-out';
    sketch.fillStyle = 'rgba( 0, 0, 0 , ' + ( opt.clearAlpha / 100 ) + ' )';
  	sketch.fillRect( 0, 0, sketch.width, sketch.height );
    sketch.globalCompositeOperation = 'lighter';
  };

  sketch.update = function(){
    dt = ( sketch.dt < 0.1 ) ? 0.1 : sketch.dt / 16;
    dt = ( dt > 5 ) ? 5 : dt;
    var i = orbs.length;
    opt.total = i;
    while( i-- ){ 
      orbs[i].update();
    }
  };

  sketch.draw = function(){
    sketch.save();
    sketch.translate( center.x, center.y );
    sketch.scale( opt.scale, opt.scale );
    var i = orbs.length;
  	while( i-- ){	
      orbs[i].render();	
    }
    sketch.restore();
  };




  customContainer = document.getElementById( 'gui' );
  customContainer.appendChild(gui.domElement);

  document.onselectstart = function(){
    return false;
  };
}

