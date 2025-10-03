$(document).ready(async function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	
    //Mostrar popup de incluir el id del juego del usuario cuando es la primera vez que inicia sesion en la aplicación
    if(usuario.juegoId == null) {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").show();
	} else {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").hide();
		usuario = await recuperarUsuarioPorId(usuario.id);
	}
	
    // logica añadir el id del juego
    $("#btnAceptarIdJuego").click(async function() {
		let errores = validarIdJuego();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			await actualizarIdJuego();
			popupErroresOConfirmacion.mostrar("success", "" , "¡Se ha guardado correctamente tu id de juego!");
			cerrarPopupInsertarIdJuego();
			usuario = await recuperarUsuarioPorId(usuario.id);
			localStorage.setItem("usuario", JSON.stringify(usuario));
			barraSuperior.mostrarDatos(usuario);
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
	
	async function actualizarIdJuego() {
		let usuarioActualizar = {};
		usuarioActualizar.id = usuario.id;
		usuarioActualizar.juegoId = $("#inputIdJuego").val();
		await actualizarUsuario(usuarioActualizar);
	}
	
	async function recuperarUsuarioPorId(id) {
		let usuarioBuscar = {}
		usuarioBuscar.id = id;
		let usuarios = await recuperarUsuario(usuarioBuscar);
		return usuarios[0];
	}
	    
    //llamadas a las distintas aplicaciones
	$("#coleccionCartasApp").click(function() {
    	cambiarAplicacion.coleccionCartas();
    });
 
});