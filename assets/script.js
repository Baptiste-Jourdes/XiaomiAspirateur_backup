app.notification.init("Fin du Nettoyage", "Fin du Nettoyage, Retour à la Base.");
//app.notification.init("Connecté !", "Connection Etabli !");

//var first = 0;
GetStatus();
var myVar = setInterval(GetStatus, 1000);
function GetStatus() {
	front.send("get_status");
}

/*front.on("hello from back", function(msg){
	console.log(msg);
	$('#msg').html(msg);
});
*/

front.on("Return", function(cmd,msg){
	$('#miio_back_'+cmd).html(msg);
	setTimeout(function(){ $('#miio_back_'+cmd).html(" ") },5000);
});

front.on("get_status", function(Battery,State,Area){
	if($('#State').html() == 'Nettoie' && State == 'Retour à la base'){
		app.notification.show(1);
	}
	
	if(State == 'Nettoie'){
		$('#Area').css('visibility', 'visible');
		$('#Area').html('Surface Nettoyé: ' + Math.round(Area) + 'm²');
	}else{
		$('#Area').css('visibility', 'hidden');
	}
	
	$('#Battery').html(Battery);
	$('#State').html(State);
	/*if(first==0){
		first = 1;
		app.notification.show(2);
	}*/
});







