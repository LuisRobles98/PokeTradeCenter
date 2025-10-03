// funciones genericas

//popupErrores
const popupErroresOConfirmacion = {
    mostrar: function(icono, titulo, errores) {
        Swal.fire({
            icon: icono,
            title: titulo,
            html: errores ? `<ul style="text-align: left; margin-left: 20px; font-family: Arial, sans-serif; font-weight: bold;"> ${errores} </ul>` : "",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
            customClass: {
                confirmButton: 'swal-confirm-bold'
            },
            didOpen: (popup) => {
                popup.style.borderRadius = "30px";          // esquinas redondeadas
            },
            didRender: () => {
                // ⚡ Evitar que SweetAlert2 mueva el body
                document.body.style.position = 'initial';
                document.body.style.top = '';
                document.body.style.left = '';
            },
            willClose: () => {
                // ⚡ restaurar padding si quieres
                document.body.style.paddingRight = '';
            }
        });
    }
};


// query para GET de objetos
const QueryURL = {
	formar: function(obj) {
		return Object.keys(obj)
        	.filter(key => obj[key] != null && obj[key] !== '')
        	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        	.join('&');
	}
}

const usuarioLogado = {
	recuperar: function() {
		return JSON.parse(localStorage.getItem("usuario"));	
	}
}


const barraSuperior = {
    cargar: function() {
        // Solo cargamos si NO es la página de login
        if (!window.location.pathname.includes("paginaPrincipal.html")) {
            $("#barraContainer").load("/generico/html/barraSuperior.html", function() {
                let usuario = usuarioLogado.recuperar();
                if(usuario) {
                    barraSuperior.mostrarDatos(usuario);
                }

				if(window.location.pathname.includes("menuPrincipal.html")) {
					$("#botonVolverAtrasBarra").hide();
				} else {
					$("#botonVolverAtrasBarra").show();
				}

                // Configuración de botones
                $("#botonVolverAtrasBarra").click(function() {
                    cambiarAplicacion.menuPrincipal();
                });
                $("#botonCerrarSesionBarra").click(function() {
                    $("#popupCerrarSesion").show();
                });
                $("#btnCancelar").click(function() {
                    $("#popupCerrarSesion").hide();
                });
                $("#btnCerrarSesion").click(function() {
                    cambiarAplicacion.paginaPrincipal();
                });
            });
        }
    },

    mostrarDatos: function(usuario) {
        $("#iconoJuegoBarra").attr("src", "/imagenes/iconos/" + usuario.iconoId + ".png");
        
        $("#nombreUsuarioBarra").text(usuario.nombre);
        $("#juegoIdUsuarioBarra").text(usuario.juegoId);
        
        $("#emblema1Barra").attr("src", "/imagenes/emblemas/" + usuario.emblema1Id + ".png");
        $("#emblema2Barra").attr("src", "/imagenes/emblemas/" + usuario.emblema2Id + ".png");
        $("#emblema3Barra").attr("src", "/imagenes/emblemas/" + usuario.emblema3Id + ".png");
    }
};

const cambiarAplicacion = {
	paginaPrincipal: function() {
		window.location.href = "/paginaPrincipal/html/paginaPrincipal.html";
	},
	menuPrincipal: function() {
		window.location.href = "/menuPrincipal/html/menuPrincipal.html";
	},
	coleccionCartas: function() {
		window.location.href = "/coleccionCartas/html/coleccionCartas.html";
	}	
};
