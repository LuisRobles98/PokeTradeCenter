$(document).ready(function() {
	let _usuario = JSON.parse(localStorage.getItem("usuario"));
    //Mostrar popup de incluir el id de usuario del juego cuando es la primera vez que inicia sesion en la aplicacion 
    if(_usuario.idJuego == null) {
		$("#popupInsertarIdUsuario").show();	
	} else {
		$("#popupInsertarIdUsuario").hide();
	}
 
});