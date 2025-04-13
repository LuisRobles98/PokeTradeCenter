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

	//logica registrarse en la aplicacion
    $("#btnRegistrarse").click(function() {
        alert("Registrando usuario...");
    });
});