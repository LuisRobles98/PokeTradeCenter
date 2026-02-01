// funciones genericas

// popup de errores o confirmacion
const popupErroresOConfirmacion = {
    mostrar: function(icono, titulo, errores) {
        Swal.fire({
            icon: icono,
            title: titulo,
            html: errores ? `<ul style="text-align: left; color: #68768A; font-family: Arial, sans-serif; font-weight: bold;"> ${errores} </ul>` : "",
            confirmButtonText: "Aceptar",
            customClass: {
				title: 'titlePopupErrorConfirmacion',
                confirmButton: 'botonAceptar'
            },
            didOpen: (popup) => {
                popup.style.borderRadius = "30px";
            },
            didRender: () => {
                //Evitar que SweetAlert2 mueva el body
                document.body.style.position = 'initial';
                document.body.style.top = '';
                document.body.style.left = '';
            },
            willClose: () => {
                //restaurar padding si quieres
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

// recuperar usuario logado
const usuarioLogado = {
	recuperar: function() {
		return JSON.parse(localStorage.getItem("usuario"));	
	}
}

// cargar barra superior
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

// abrir aplicaciones del menú
const cambiarAplicacion = {
	paginaPrincipal: function() {
		window.location.href = "/paginaPrincipal/html/paginaPrincipal.html";
	},
	menuPrincipal: function() {
		window.location.href = "/menuPrincipal/html/menuPrincipal.html";
	},
	crearIntercambio: function() {
		window.location.href = "/crearIntercambio/html/crearIntercambio.html";
	},
	intercambiosActivos: function() {
		window.location.href = "/intercambiosActivos/html/intercambiosActivos.html";
	},
	tablonIntercambios: function() {
		window.location.href = "/tablonIntercambios/html/tablonIntercambios.html";
	},
	coleccionCartas: function() {
		window.location.href = "/coleccionCartas/html/coleccionCartas.html";
	},
	crearBarajas: function() {
		window.location.href = "/crearBarajas/html/crearBarajas.html";
	},
	misBarajas: function() {
		window.location.href = "/misBarajas/html/misBarajas.html";
	},
	barajasPublicas: function() {
		window.location.href = "/barajasPublicas/html/barajasPublicas.html";
	},
	perfil: function() {
		window.location.href = "/perfil/html/perfil.html";
	}
};
