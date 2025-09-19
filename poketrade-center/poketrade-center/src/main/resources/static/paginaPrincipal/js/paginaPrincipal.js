$(document).ready(function() {
	//constantes
	
    //Mostrar popup principal al iniciar la aplicacion
    limpiarIniciarSesion();
    $("#popupIniciarSesion").show();
    $("#popupRegistrarse").hide();

    // logica acceder a popup registrarse
    $("#btnRegistrarse").click(function() {
		limpiarRegistrarse();
        $("#popupIniciarSesion").hide();
        $("#popupRegistrarse").show();
    });
 
    //logica boton volver de registro
	$("#btnVolverRegistrarse").click(function() {
		limpiarIniciarSesion();
        $("#popupRegistrarse").hide(); 
        $("#popupIniciarSesion").show();
    });

    // logica acceder tras rellenar datos del registro
    $("#btnAcceder").click(function() {
        acceder();
    });

    $("#btnConfirmarRegistrarse").click(function(){
		guardarRegistro();
	});
	
	async function guardarRegistro() {
		let errores = await validarRegistro();
		
		if(errores != "") {
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			guardar();
			popupErroresOConfirmacion.mostrar("success", "¡Registro completado!");
			$("#btnVolverRegistrarse").click();
		}
	};
	
	function guardar() {
		let usuario = {};
		usuario.nombre = $("#inputUsuarioRegistro").val();
		usuario.email = $("#inputCorreoRegistro").val();
		usuario.password = $("#inputPasswordRegistro").val();
		usuario.icono = "Pikachu";
		guardarUsuario(usuario);
	};
	
	async function validarRegistro() {
		let errores = "";
		if($("#inputUsuarioRegistro").val() == "") {
			errores += "- Debes introducir un nombre" + "<br>";
		}
		if($("#inputCorreoRegistro").val() == "") {
			errores += "- Debes introducir un email" + "<br>";
		} else if($("#inputCorreoRegistro").val().indexOf('@') === -1 || $("#inputCorreoRegistro").val().indexOf('.') === -1) {
			errores += "- Debes introducir un email valido" + "<br>";
		}
		
		//comprobar que el correo no exista en bbdd
 		let correoExiste = await comprobarCorreoExiste();
	    if (correoExiste) {
	        errores += "- El correo ya existe en el sistema" + "<br>";
	    }
		
		if($("#inputPasswordRegistro").val() == "") {
			errores += "- Debes introducir una contraseña valida" + "<br>";
		} else if($("#inputPasswordRegistro").val().length < 8) {
			errores += "- La contraseña tiene que tener 8 caracteres como mínimo" + "<br>";
		}
		if($("#inputPassword2Registro").val() == "") {
			errores += "- Debes volver a introducir la contraseña para verificarla" + "<br>";
		}
		if($("#inputPasswordRegistro").val() != $("#inputPassword2Registro").val()) {
			errores += "- Las contraseñas no coinciden" + "<br>";
		}
		return errores;
	};
	
	async function comprobarCorreoExiste() {
		let usuarioBuscar = {};
		usuarioBuscar.email = $("#inputCorreoRegistro").val();
    	let usuarios = await recuperarUsuario(usuarioBuscar);
		return usuarios.length == 1;
	}
	
	async function acceder() {
		let errores = await validarAcceso();
		if(errores != "") {
			popupErroresOConfirmacion.mostrar("error", "No se ha podido acceder", errores);
		} else {
			let usuarioBuscar = {};
			usuarioBuscar.email = $("#inputCorreoInicioSesion").val();
			usuarioBuscar.password = $("#inputPasswordInicioSesion").val();
			let usuario = await recuperarUsuario(usuarioBuscar);
			localStorage.setItem("usuario", JSON.stringify(usuario[0]));
			cambiarAplicacion.menuPrincipal();
		}
	}
	
	async function validarAcceso() {
		let errores = "";
		if($("#inputCorreoInicioSesion").val() == "") {
			errores += "- Debes introducir un email" + "<br>";
		} else if($("#inputCorreoInicioSesion").val().indexOf('@') === -1 || $("#inputCorreoInicioSesion").val().indexOf('.') === -1) {
			errores += "- Debes introducir un email valido" + "<br>";
		}
		if($("#inputPasswordInicioSesion").val() == "") {
			errores += "- Debes introducir una contraseña" + "<br>";
		}
		
		if(errores == "") {
			let usuarioExiste = await comprobarUsuarioExiste();
			if(!usuarioExiste) {
				errores += "- El email o la contraseña no coinciden" + "<br>";
			}
		}
		return errores;
	}
	
	async function comprobarUsuarioExiste() {
		let usuarioBuscar = {};
		usuarioBuscar.email = $("#inputCorreoInicioSesion").val();
		usuarioBuscar.password = $("#inputPasswordInicioSesion").val();
		let usuarios = await recuperarUsuario(usuarioBuscar);
		return usuarios.length == 1;
	}
	
	function limpiarIniciarSesion() {
		$("#inputCorreoInicioSesion").val("");
		$("#inputPasswordInicioSesion").val("");
	}

	function limpiarRegistrarse() {
		$("#inputUsuarioRegistro").val("");
		$("#inputCorreoRegistro").val("");
		$("#inputPasswordRegistro").val("");
		$("#inputPassword2Registro").val("");
	}
});