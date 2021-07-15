/* eslint-disable */

const miio = require('./lib');

var myVar
//myVar = setInterval(GetStatus, 500);
function GetStatus() {
	miio.device({
	address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
}).then(device => {
	device.call('get_status', []).then(result=>console.log(result)).catch(err => console.log('erreur'));
	console.log('Status');
}).catch(err => console.log('Error occurred:', err));
}

// Create a new device over the given address
miio.device({
	address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
}).then(device => {
	console.log('Connected to device');
	console.log(device);
	console.log(device._properties['state']);
	console.log(device._properties['cleanArea']);
	//console.log(device._properties['error'].code);
	
				device.call('change_sound_volume', [0]).catch(err => console.log('erreur'));
				setTimeout(function(){ 
					device.call('app_start', [], {
			refresh: [ 'state' ],
			refreshDelay: 1000
			}).then(result=>{
				console.log('Pause');
						console.log(result);
						console.log(device._properties['state'].code);
						while(device._properties['state'].code==8);
						console.log('Map');
						console.log(device._properties['state'].code);
						setTimeout(function(){ 
							device.call('app_pause', [], {
							refresh: [ 'state' ],
							refreshDelay: 1000
							}).then(result=>{
								console.log(result);
							}).catch(err => console.log('erreur'));
						},1000);
						
					}).catch(err => console.log('erreur'));
				},500);
				
				/*setTimeout(function(){ 
					device.call('change_sound_volume', [10]).catch(err => console.log('erreur'));
				},500);*/
				
				
}).catch(err => console.log('Error occurred:', err));



/*
miio.device({
	address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
}).then(device => {
	
				device.call('change_sound_volume', [0]).catch(err => console.log('erreur'));
				setTimeout(function(){ 
					device.call('app_start', [], {
			refresh: [ 'state' ],
			refreshDelay: 1000
			}).then(result=>{
						console.log(result);
						console.log(device._properties['state'].code);
						while(device._properties['state'].code==8);
						console.log('Map');
						console.log(device._properties['state'].code);
						setTimeout(function(){ 
							device.call('app_pause', [], {
							refresh: [ 'state' ],
							refreshDelay: 1000
							}).then(result=>{
								console.log(result);
							}).catch(err => console.log('erreur'));
						},500);
						
					}).catch(err => console.log('erreur'));
				},500);
				setTimeout(function(){ 
					device.call('change_sound_volume', [10]).catch(err => console.log('erreur'));
				},500);
				
				
}).catch(err => console.log('Error occurred:', err));
*/
