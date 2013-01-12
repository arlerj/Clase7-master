//Contactos
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		
		function onDeviceReady() {
        var options = new ContactFindOptions();
        options.filter=""; 
        var fields = ["displayName", "name"];
		options.multiple = true;
        navigator.contacts.find(fields, onSuccess, onError, options);
    	}
		
		// onSuccess: Get a snapshot of the current contacts
    	//
    	function onSuccess(contacts) {
        	for(var i=0;i<contacts.length;i++){
			$('contactos .plastic').append('<li>'+contacts[i].displayName+'</li>');
			}
    	}

	    // onError: Failed to get the contacts
    	//
	    function onError(contactError) {
        	alert('onError!');
    	}
		
		//Crear Contactos
		$('#nuevoCont .individual li').eq(0).tap(function(){
			var nueContacto = navigator.contacts.create();
			
			nueContacto.displayName = $('#nuevoCont .rounded li').eq(0).children('input').val();
			nueContacto.nickName = $('#nuevoCont .rounded li').eq(0).children('input').val();
			
			var nombre = new ContactName();
			nombre.givenName = $('#nuevoCont .rounded li').eq(0).children('input').val();
			nueContacto.name = nombre;
			
			var telefono = [];
			telefono[0] = new ContactField('home', $('#nuevoCont .rounded li').eq(0).children('input').val(), true);
			telefono[1] = new ContactField('mobile', "123-456-7890", false);
			nueContacto.phoneNumbers = telefono;
			
			nueContacto.save(function(){
				alert('¡Guardado!');
				$('#nuevoCont .individual a').eq(1).tap();
			}, function(err){
				alert('Error: '+err.code);
			});
		});
	});
});