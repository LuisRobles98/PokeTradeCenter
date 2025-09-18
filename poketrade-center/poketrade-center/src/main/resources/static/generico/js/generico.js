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

                // Configuración de botones
                $("#btnLogout").click(function() {
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
        $("#iconoJuegoBarra").attr("src", "/imagenes/iconos/" + usuario.icono + ".png");
        $("#nombreUsuarioBarra").text(usuario.nombre);
        $("#idUsuarioBarra").text("ID: " + usuario.idJuego);
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

const combo = {
    cargarRareza: function(comboElement) {
        if (!comboElement) return;

        const rarezas = [
			{ id: 0, simbolo: "Todas las rarezas" },
            { id: 1, simbolo: "♦" },
            { id: 2, simbolo: "♦♦" },
            { id: 3, simbolo: "♦♦♦" },
            { id: 4, simbolo: "♦♦♦♦" },
            { id: 5, simbolo: "★" },
            { id: 6, simbolo: "★★" },
            { id: 7, simbolo: "★★★" },
            { id: 8, simbolo: "✵" },
            { id: 9, simbolo: "✵✵" },
            { id: 10, simbolo: "♕" }
        ];

        comboElement.innerHTML = "";

        // Agregar opciones
        rarezas.forEach((r, i) => {
    		const option = document.createElement("option");
    		option.value = r.id;
    		option.text = r.simbolo;
    		comboElement.add(option);
		});
    },
    
    cargarEnergia: function(comboElement) {
        if (!comboElement) return;

        const energias = [
			{ id: 0, simbolo: "Todas las energías" },
            { id: 1, simbolo: "Incoloro" },
            { id: 2, simbolo: "Oscuro" },
            { id: 3, simbolo: "Dragón" },
            { id: 4, simbolo: "Lucha" },
            { id: 5, simbolo: "Fuego" },
            { id: 6, simbolo: "Planta" },
            { id: 7, simbolo: "Eléctrico" },
            { id: 8, simbolo: "Metal" },
            { id: 9, simbolo: "Psíquico" },
            { id: 10, simbolo: "Agua" }
        ];

        comboElement.innerHTML = "";

        // Agregar opciones
        energias.forEach((r, i) => {
    		const option = document.createElement("option");
    		option.value = r.id;
    		option.text = r.simbolo;
    		comboElement.add(option);
		});
    },
    
    cargarTipo: function(comboElement) {
        if (!comboElement) return;

        const tipos = [
			{ id: 0, simbolo: "Todos los tipos" },
            { id: 1, simbolo: "Pokemon" },
            { id: 2, simbolo: "Objeto" },
            { id: 3, simbolo: "Partidario" },
            { id: 4, simbolo: "Herramienta" }
        ];

        comboElement.innerHTML = "";

        // Agregar opciones
        tipos.forEach((r, i) => {
    		const option = document.createElement("option");
    		option.value = r.id;
    		option.text = r.simbolo;
    		comboElement.add(option);
		});
    }
};


