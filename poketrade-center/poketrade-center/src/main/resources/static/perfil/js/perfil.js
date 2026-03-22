$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	cargarPerfilUsuario(usuario);
	
	function cargarPerfilUsuario(usuario) {
		$("#inputNombreUsuario").val(usuario.nombre);
		$("#inputJuegoIdUsuario").val(usuario.juegoId);
		$("#inputCorreoUsuario").val(usuario.email);
		$("#iconoUsuario").attr("src", "/imagenes/iconos/" + usuario.iconoId + ".png");
		$("#emblema1Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema1Id + ".png");
        $("#emblema2Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema2Id + ".png");
        $("#emblema3Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema3Id + ".png");
	}
	
	$("#iconoUsuario").click(function() {
		$("#iconos").show();
		let contenedor = document.getElementById("mostrarIconos");
		contenedor.innerHTML = "";
		for(let i = 1; i <= 54; i++) {
        	let img = document.createElement("img");
        	img.classList.add("iconoSeleccionado", "icono"); // clase para aplicar CSS
        	img.src = "/imagenes/iconos/" + i + ".png";
        	img.dataset.id = i;
        	contenedor.appendChild(img);
		}
		contenedor.scrollTo({ top: 0 });
	});
	
	//funcion seleccionar icono
	$("#mostrarIconos").on("click", ".iconoSeleccionado", function() {
		usuario.iconoId = $(this).data("id");
		$("#iconoUsuario").attr("src", "/imagenes/iconos/" + usuario.iconoId + ".png");
    	$("#iconos").hide();
	});
	
	$("#emblema1Usuario").click(function() {
		cargarPopupEmblemas(1);
	});
	
	$("#emblema2Usuario").click(function() {
		cargarPopupEmblemas(2);
	});
	
	$("#emblema3Usuario").click(function() {
		cargarPopupEmblemas(3);
	});
	
	function cargarPopupEmblemas(emblema) {
		$("#emblemas").show();
		let contenedor = document.getElementById("mostrarEmblemas");
		contenedor.innerHTML = "";
		for(let i = 0; i <= 28; i++) {
        	let img = document.createElement("img");
        	img.classList.add("emblemaSeleccionado", "icono"); // clase para aplicar CSS
        	img.src = "/imagenes/emblemas/" + i + ".png";
        	img.dataset.id = i;
        	img.dataset.emblema = emblema;
        	contenedor.appendChild(img);
		}
		contenedor.scrollTo({ top: 0 });
	}
	
	//funcion seleccionar emblemas
	$("#mostrarEmblemas").on("click", ".emblemaSeleccionado", function() {
		let emblema = $(this).data("emblema");
		if(emblema == 1) {
			usuario.emblema1Id = $(this).data("id");
			$("#emblema1Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema1Id + ".png");
		} else if(emblema == 2) {
			usuario.emblema2Id = $(this).data("id");
			$("#emblema2Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema2Id + ".png");
		} else if(emblema == 3) {
			usuario.emblema3Id = $(this).data("id");
			$("#emblema3Usuario").attr("src", "/imagenes/emblemas/" + usuario.emblema3Id + ".png");
		}
    	$("#emblemas").hide();
	});
	
	$("#btnModificarDatosUsuario").click(async function() {
		let errores = validarDatos();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarDatosUsuario();	
				popupErroresOConfirmacion.mostrar("success", "Se han actualizado correctamente los datos" , "");
				usuario = await recuperarUsuarioPorId(usuario.id);
				localStorage.setItem("usuario", JSON.stringify(usuario));
				barraSuperior.mostrarDatos(usuario);
				cargarPerfilUsuario(usuario);
				limpiarPopupPassword();
			} catch(error) {
				popupErroresOConfirmacion.mostrar("error","Ha ocurrido el siguiente error en el sistema:",error.message);
			}
		}
    });
    
    function validarDatos() {
		let errores = "";
		if($("#inputNombreUsuario").val().trim() == "") {
			errores += "- Debes introducir un nombre de usuario" + "<br>";
		} else if($("#inputNombreUsuario").val().length > 45) {
			errores += "- El nombre de usuario no puede tener más de 45 caracteres" + "<br>";
		}
		if($("#inputJuegoIdUsuario").val().trim() == "") {
			errores += "- Debes introducir un id de Pokemon TCG Pocket" + "<br>";
		} else if($("#inputJuegoIdUsuario").val().length > 45) {
			errores += "- El id de Pokémon TCG Pocket no puede tener más de 45 caracteres" + "<br>";
		}
		return errores;
	}
	
	async function actualizarDatosUsuario() {
		let usuarioActualizar = {};
		usuarioActualizar.id = usuario.id;
		usuarioActualizar.nombre = $("#inputNombreUsuario").val();
		usuarioActualizar.juegoId = $("#inputJuegoIdUsuario").val();
		usuarioActualizar.iconoId = usuario.iconoId;
		usuarioActualizar.emblema1Id = usuario.emblema1Id;
		usuarioActualizar.emblema2Id = usuario.emblema2Id;
		usuarioActualizar.emblema3Id = usuario.emblema3Id;
		usuarioActualizar.password = $("#inputPasswordUsuario").val();
		await actualizarUsuario(usuarioActualizar);
	}
	
	async function recuperarUsuarioPorId(id) {
		let usuarioBuscar = {}
		usuarioBuscar.id = id;
		let usuarios = await recuperarUsuario(usuarioBuscar);
		return usuarios[0];
	}

	$("#cambioPassword").click(function() {
		$("#password").show();
		let contenedor = document.getElementById("mostrarIconos");
		contenedor.innerHTML = "";
		for(let i = 1; i <= 54; i++) {
        	let img = document.createElement("img");
        	img.classList.add("iconoSeleccionado"); // clase para aplicar CSS
        	img.src = "/imagenes/iconos/" + i + ".png";
        	img.dataset.id = i;
        	contenedor.appendChild(img);
		}
	});
	
	$("#btnCancelarPassword").click(function() {
		$("#password").hide();
		limpiarPopupPassword();
	});
	
	function limpiarPopupPassword() {
		$("#inputPasswordUsuario").val("");
		$("#inputPasswordUsuarioConfirmacion").val("");
	}
	
	$("#btnModificarPassword").click(function() {
		let errores = validarModificarPassword();
		if(errores != "") {
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			$("#password").hide();
		}
	});
	
	function validarModificarPassword() {
		let errores = "";
		
		if($("#inputPasswordUsuario").val().trim() == "") {
			errores += "- Debes introducir una contraseña valida" + "<br>";
		} else if($("#inputPasswordUsuario").val().length < 8) {
			errores += "- La contraseña debe tener 8 caracteres como mínimo" + "<br>";
		} else if($("#inputPasswordUsuario").val().length > 45) {
			errores += "- La contraseña no puede tener más de 45 caracteres" + "<br>";
		}
		if($("#inputPasswordUsuarioConfirmacion").val().trim() == "") {
			errores += "- Debe volver a introducir la contraseña para verificarla" + "<br>";
		}
		if($("#inputPasswordUsuario").val() != $("#inputPasswordUsuarioConfirmacion").val()) {
			errores += "- Las contraseñas no coinciden" + "<br>";
		}
		
		return errores;
	}
	
	$("#btnCancelarIcono").click(function() {
		$("#iconos").hide();
	});
	
	$("#btnCancelarEmblema").click(function() {
		$("#emblemas").hide();
	});

});