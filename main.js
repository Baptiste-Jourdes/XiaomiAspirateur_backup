const back = require('androidjs').back;

const miio = require('miio');

/*back.on("hello", function(){	
	miio.device({
			address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
	}).then(device => {
			console.log('Connected to device');
			console.log(device);
			back.send("hello from back","Connected !")
			
			device.call('find_me', [])
	}).catch(err => back.send("hello from back","Error !"));

});
*/


back.on("SendCMD", function(cmd,args){	
	miio.device({
			address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
	}).then(device => {
			console.log('Connected to device');
			console.log(device);
			
			if(cmd=='app_zoned_clean' || cmd=='app_goto_target'){
				
				device.call('change_sound_volume', [0]).catch(err => back.send("Return",cmd,"Erreur !"));
				
				setTimeout(function(){ 
					device.call('app_start', []).catch(err => back.send("Return",cmd,"Erreur !"));
				},500);
				
				setTimeout(function(){ 
					device.call('app_stop', []).catch(err => back.send("Return",cmd,"Erreur !"));
				},1500);
				
				setTimeout(function(){ 
					device.call('change_sound_volume', [75]).catch(err => back.send("Return",cmd,"Erreur !"));
				},500);
				
			}
			
			device.call(cmd, args, {
			refresh: [ 'state' ],
			refreshDelay: 1000
			}).then( result => {
				back.send("Return",cmd,result);
				if(result == 'ok') {
					back.send("Return",cmd,"Ok");
				}else{
					back.send("Return",cmd,"Erreur.");
				}
							
			}).catch(err => back.send("Return",cmd,"Erreur !"));

	}).catch(err => back.send("Return",cmd,"Erreur !"));
});


back.on("get_status", function(){	
	miio.device({
			address: '192.168.1.59', token: '44776f3341463779597541424d4e6563'
	}).then(device => {		
		back.send("get_status",device._properties['batteryLevel'],device._properties['state'],device._properties['cleanArea']);
	}).catch(err => console.log('Error occurred:', err));
});

/*
const AutoGitUpdate = require('auto-git-update');

const config = {
    repository: 'https://github.com/chegele/BackupPurger'
    tempLocation: 'C:/Users/scheg/Desktop/tmp/',
    ignoreFiles: ['util/config.js'],
    exitOnComplete: true
}

const updater = new AutoGitUpdate(config);

updater.autoUpdate();
*/