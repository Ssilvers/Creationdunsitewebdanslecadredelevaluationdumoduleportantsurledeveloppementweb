var p = document.getElementById("position");
var d = document.getElementById("distance");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {timeout:9000});
  } else {
	  // A modifier pour fonctionner si nav non supporté
    p.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function geoSuccess(position) {
	var distance;
  p.innerHTML = "Votre position est {" + position.coords.latitude.toFixed(2) +
  ", " + position.coords.longitude.toFixed(2) + "} (avec une précision de 20m)";
  distance = calculDistance(position.coords);
  d.innerHTML = "Vous êtes à " + distance.toFixed(2) + " km de l'ESIREM";
}

function geoError(error){
	if(p.hasAttribute('id',"position")){
		p.removeAttribute('id',"position");
		p.setAttribute('id',"erreur");
	}
	else{
		p.removeAttribute('id',"erreur");
		p.setAttribute('id',"position");
	}
	if(d.hasAttribute('id',"distance")){
		d.removeAttribute('id',"distance");
		d.setAttribute('id',"erreur");
	}
	else{
		d.removeAttribute('id',"erreur");
		d.setAttribute('id',"distance");
	}
	
	switch(error.code) {
	    case error.PERMISSION_DENIED:
	      	p.innerHTML = "User denied the request for Geolocation."
	      	break;
	    case error.POSITION_UNAVAILABLE:
	      	p.innerHTML = "Location information is unavailable."
	      	break;
	    case error.TIMEOUT:
	      	p.innerHTML = "The request to get user location timed out."
	      	break;
	    case error.UNKNOWN_ERROR:
	     	p.innerHTML = "An unknown error occurred."
	      	break;
  }
}

function calculDistance(startCoords) {
	var startLatRads = degreesEnRadians(startCoords.latitude);
	var startLongRads = degreesEnRadians(startCoords.longitude);
	var destLatRads = degreesEnRadians(47.3121843);
	var destLongRads = degreesEnRadians(5.0736829);
	var Radius = 6371; // rayon de la Terre en km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
	Math.cos(startLatRads) * Math.cos(destLatRads) *
	Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
}	

function degreesEnRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

window.onload = getLocation;


/*RESTE A FAIRE(-) / REVOIR(?):
	- Cas où API pas supportée par navigateur
	? Couleur de fond dans classe ou possible de mettre dans body
	- Vérifier erreur calcul de distance (perso j'ai une marge de 27km donc semble ok)
	-? La div erreur pour fonction "geoError"
	? Vérifier le css

*/
