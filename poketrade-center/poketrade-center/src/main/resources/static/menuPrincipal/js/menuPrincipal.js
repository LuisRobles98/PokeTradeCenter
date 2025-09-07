$(document).ready(function() {
	let _usuario = JSON.parse(localStorage.getItem("usuario"));
    //Mostrar popup de incluir el id del juego del usuario cuando es la primera vez que inicia sesion en la aplicación
    if(_usuario.idJuego == null) {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").show();	
	} else {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").hide();
	}
	
    // logica añadir el id del juego
    $("#btnAceptarIdJuego").click(function() {
		let errores = validarIdJuego();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			//guardarUsuario();
			popupErroresOConfirmacion.mostrar("success", "" , "¡Se ha guardado correctamente tu id de juego!");
			cerrarPopupInsertarIdJuego();
		}
    });
    
    function validarIdJuego() {
		let errores = "";
		if($("#inputIdJuego").val() == "") {
			errores += "- Debes introducir un id de juego" + "<br>";
		}
		return errores;
	}
	
	function cerrarPopupInsertarIdJuego() {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").hide();
	}
	
	function limpiarPopupAniadirIdJuego() {
		$("#inputIdJuego").val("");
	}
 
});