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
	
	const guardarRegistro = function() {
		let errores = validarRegistro();
		
		if(errores != "") {
			//enviar mensaje de error
		} else {
			guardar();
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
	
	const validarRegistro = function() {
		let errores = "";
		if($("#inputUsuarioRegistro").val() == "") {
			errores += "- Debes introducir un nombre" + "<br>";
		}
		if($("#inputCorreoRegistro").val() == "") {
			errores += "- Debes introducir un email" + "<br>";
		}
		if(validarCorreo()) {
			errores += "- Debes introducir un email valido" + "<br>";
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
	
	const validarCorreo = function() {
		
	};
	
});