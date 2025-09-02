$(document).ready(function() {
    //Mostrar popup principal al iniciar la aplicacion
    $("#popupPrincipal").show();
    $("#popupIniciarSesion").hide();
    $("#popupRegistrarse").hide();

    // logica acceder popup inicio de sesion
    $("#btnIniciarSesion").click(function() {
		limpiarIniciarSesion();
        $("#popupPrincipal").hide();
        $("#popupIniciarSesion").show();
    });

    // logica acceder a popup registrarse
    $("#btnRegistrarse").click(function() {
		limpiarRegistrarse();
        $("#popupPrincipal").hide();
        $("#popupRegistrarse").show();
    });

	//logica boton volver de inicio sesion
    $("#btnVolverInicioSesion").click(function() {
        $("#popupIniciarSesion").hide();
        $("#popupPrincipal").show();
    });
    
    //logica boton volver de registro
	$("#btnVolverRegistrarse").click(function() {
        $("#popupRegistrarse").hide(); 
        $("#popupPrincipal").show();
    });

    // logica acceder tras rellenar datos del registro
    $("#btnAcceder").click(function() {
        acceder();
    });

    $("#btnConfirmarRegistrarse").click(function(){
		guardarRegistro();
	});
	
	const guardarRegistro = async function() {
		let errores = await validarRegistro();
		
		if(errores != "") {
			mostrarPopupConfirmacionOErrores("error", "Se han producido los siguientes errores:",errores);
		} else {
			guardar();
			mostrarPopupConfirmacionOErrores("success", "¡Registro completado!");
			$("#btnVolverRegistrarse").click();
			$("#btnIniciarSesion").click();
		}
	};
	
	const guardar = function() {
		let usuario = {};
		usuario.nombre = $("#inputUsuarioRegistro").val();
		usuario.email = $("#inputCorreoRegistro").val();
		usuario.password = $("#inputPasswordRegistro").val();
		guardarUsuario(usuario);
	};
	
	const validarRegistro = async function() {
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
 		const correoExiste = await comprobarCorreoExiste();
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
	
	const comprobarCorreoExiste = async function() {
    	const usuarios = await recuperarUsuariosPorEmail($("#inputCorreoRegistro").val());
		return usuarios.length > 0;
	}
	
	const mostrarPopupConfirmacionOErrores = function(icono, titulo, errores) {
		Swal.fire({
		  icon: icono,
		  title: titulo,
		  html: errores ? `<ul style="text-align: left; margin-left: 20px;">${errores}</ul>` : "",
		  confirmButtonText: "Aceptar",
		  confirmButtonColor: "#3085d6"
		});
	}
	
	const acceder = async function() {
		let errores = await validarAcceso();
		if(errores != "") {
			mostrarPopupConfirmacionOErrores("error", "No se ha podido acceder", errores);
		} else {
			entrarMenuUsuario();
		}
	}
	
	const validarAcceso = async function() {
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
			const usuarioExiste = await comprobarUsuarioExiste();
			if(!usuarioExiste) {
				errores += "- El email o la contraseña no coinciden" + "<br>";
			}
		}
		return errores;
	}
	
	const entrarMenuUsuario = async function() {
		window.location.href = "/menuPrincipal";
	}
	
	const comprobarUsuarioExiste = async function() {
		const usuarios = await recuperarUsuariosPorEmailYPassword($("#inputCorreoInicioSesion").val(), $("#inputPasswordInicioSesion").val());
		return usuarios.length > 0;
	}
	
	const limpiarIniciarSesion = function() {
		$("#inputCorreoInicioSesion").val("");
		$("#inputPasswordInicioSesion").val("");
	}

	const limpiarRegistrarse = function() {
		$("#inputUsuarioRegistro").val("");
		$("#inputCorreoRegistro").val("");
		$("#inputPasswordRegistro").val("");
		$("#inputPassword2Registro").val("");
	}
});