$(document).ready(function() {
    //Mostrar popup principal al iniciar la aplicacion
    $("#popupPrincipal").show();
    $("#popupIniciarSesion").hide();
    $("#popupRegistrarse").hide();

    // logica acceder popup inicio de sesion
    $("#btnIniciarSesion").click(function() {
        $("#popupPrincipal").hide();
        $("#popupIniciarSesion").show();
    });

    // logica acceder a popup registrarse
    $("#btnRegistrarse").click(function() {
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
        alert("Iniciando sesión...");
    });

    $("#btnConfirmarRegistrarse").click(function(){
		guardarRegistro();
	});
	
	const guardarRegistro = async function() {
		let errores = await validarRegistro();
		
		if(errores != "") {
			//enviar mensaje de error
		} else {
			guardar();
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
		}
		if($("#inputCorreoRegistro").val().indexOf('@') === -1 || $("#inputCorreoRegistro").val().indexOf('.') === -1) {
			errores += "- Debes introducir un email valido" + "<br>";
		}
		
		//comprobar que el correo no exista en bbdd
 		const correoExiste = await comprobarCorreoExiste();
	    if (correoExiste) {
	        errores += "- El correo ya existe en el sistema" + "<br>";
	    }
		
		if($("#inputPasswordRegistro").val() == "") {
			errores += "- Debes introducir una contraseña valida" + "<br>";
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
	
});