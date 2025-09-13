$(document).ready(async function() {
	//constantes
	let ICONO = "/iconos/";
	let PNG = ".png";
	let ID_JUEGO = "Id juego: ";
	let usuario = usuarioLogado.recuperar();
	
    //Mostrar popup de incluir el id del juego del usuario cuando es la primera vez que inicia sesion en la aplicación
    if(usuario.idJuego == null) {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").show();	
	} else {
		limpiarPopupAniadirIdJuego();
		$("#popupInsertarIdJuego").hide();
		usuario = await recuperarUsuarioPorId(usuario.id);
		cargarBarraSuperior(usuario);
	}
	
    // logica añadir el id del juego
    $("#btnAceptarIdJuego").click(function() {
		let errores = validarIdJuego();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			actualizarIdJuego();
			popupErroresOConfirmacion.mostrar("success", "" , "¡Se ha guardado correctamente tu id de juego!");
			cerrarPopupInsertarIdJuego();
			usuario = recuperarUsuarioPorId(usuario.id);
			cargarBarraSuperior(usuario);
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
		usuarioActualizar.idJuego = $("#inputIdJuego").val();
		await actualizarUsuario(usuarioActualizar);
	}
	
	async function recuperarUsuarioPorId(id) {
		let usuarioBuscar = {}
		usuarioBuscar.id = id;
		let usuarios = await recuperarUsuario(usuarioBuscar);
		return usuarios[0];
	}
	
	function cargarBarraSuperior(usuario) {
		$("#iconoJuegoBarra").attr("src", ICONO + usuario.icono + PNG);
		$("#nombreUsuarioBarra").text(usuario.nombre);
		$("#idUsuarioBarra").text(ID_JUEGO + usuario.idJuego);
	}
	
    $("#btnLogout").click(function() {
        $("#popupCerrarSesion").show();
    });
    
    $("#btnCancelar").click(function() {
    	$("#popupCerrarSesion").hide();
    });
    
	$("#btnCerrarSesion").click(function() {
    	window.location.href = "/paginaPrincipal/html/paginaPrincipal.html";
    });
 
});