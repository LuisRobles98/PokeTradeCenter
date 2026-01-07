$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let listaExpansiones = [];
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	let cartasBarajaOfrecer = [];
	let cartasBarajaQuerer = [];
	let listaSeleccionada = null;
	
	limpiar();
	
	function limpiar() {
		limpiarBuscador();
		vaciarListadoOfrecer();
		vaciarListadoQuerer();
		cargarCartas();	
	}
	
	function limpiarBuscador() {
		//limpiamos input nombre carta
		$("#inputNombreCarta").val("");
		
		//vaciamos lista expansiones y eliminamos campos seleccionados
		listaExpansiones = [];
		$(".expansionCarta").removeClass("expansionSeleccionada");
		
		//vaciamos lista rarezas y eliminamos campos seleccionados
		listaRarezas = [];
		$(".rarezaCarta").removeClass("rarezaSeleccionada");
		
		//vaciamos lista energias y eliminamos campos seleccionados
		listaEnergias = [];
		$(".energiaCarta").removeClass("energiaSeleccionada");
		
		//vaciamos lista tipos y eliminamos campos seleccionados
		listaTipos = [];
		$(".tipoCarta").removeClass("tipoSeleccionada");
	}
	
	function vaciarListadoOfrecer() {
		// Inicializar el array con 5 cartas vacías
    	cartasBarajaOfrecer = Array.from({ length: 5 }, () => ({
			expansionId: 0,
			cartaJuegoId: 0,
			rarezaId: 0,
			nombre: null,
			basico: null
		}));
		listaSeleccionada = null;
		$(".tipoIntercambio").removeClass("tipoSeleccionada");
    	recargarOfrecer();
	}
	
	function vaciarListadoQuerer() {
		// Inicializar el array con 5 cartas vacías
    	cartasBarajaQuerer = Array.from({ length: 5 }, () => ({
			expansionId: 0,
			cartaJuegoId: 0,
			rarezaId: 0,
			nombre: null,
			basico: null
		}));
		listaSeleccionada = null;
		$(".tipoIntercambio").removeClass("tipoSeleccionada");
    	recargarQuerer();
	}
	
	function recargarOfrecer() {
		let contenedor = document.getElementById("cartasBarajaOfrecer");
		contenedor.innerHTML = "";
		cartasBarajaOfrecer.forEach((carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaBaraja");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaBarajaAniadida");
				img.src = carta.src;
				img.dataset.expansionId = carta.expansionId;
    			img.dataset.cartaJuegoId = carta.cartaJuegoId;
				img.dataset.nombre = carta.nombre;
				img.dataset.posicion = carta.posicion;
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
    			img.dataset.rarezaId = 0;
    			img.dataset.nombre = null;
			}
    		contenedor.appendChild(img);
		});
	}
	
	function recargarQuerer() {
		let contenedor = document.getElementById("cartasBarajaQuerer");
		contenedor.innerHTML = "";
		cartasBarajaQuerer.forEach((carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaBaraja");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaBarajaAniadida");
				img.src = carta.src;
				img.dataset.nombre = carta.nombre;
				img.dataset.posicion = carta.posicion;
				img.dataset.basico = carta.basico;
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
    			img.dataset.rarezaId = 0;
    			img.dataset.nombre = null;
    			img.dataset.basico = null;
			}
    		contenedor.appendChild(img);
		});
	}
	
	$("#inputNombreCarta").on("input", function() {
    	buscarCartasIntercambioPorCriterios();
	});
	
	//funcionalidad click expansiones
	$(".expansionCarta").click(function() {
		let id = $(this).data("id");
		if(listaExpansiones.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaExpansiones = listaExpansiones.filter(e => e != id);
        	$(this).removeClass("expansionSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaExpansiones.push(id);
        	$(this).addClass("expansionSeleccionada");
    	}
    	buscarCartasIntercambioPorCriterios();
	});
	
	//funcionalidad click rarezas
	$(".rarezaCarta").click(function() {
		let id = $(this).data("id");
		if(listaRarezas.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaRarezas = listaRarezas.filter(e => e != id);
        	$(this).removeClass("rarezaSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaRarezas.push(id);
        	$(this).addClass("rarezaSeleccionada");
    	}
    	buscarCartasIntercambioPorCriterios();
	});
	
	//funcionalidad click energia
	$(".energiaCarta").click(function() {
		let id = $(this).data("id");
		if(listaEnergias.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaEnergias = listaEnergias.filter(e => e != id);
        	$(this).removeClass("energiaSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaEnergias.push(id);
        	$(this).addClass("energiaSeleccionada");
    	}
    	buscarCartasIntercambioPorCriterios();
	});
	
	//funcionalidad click tipo
	$(".tipoCarta").click(function() {
		let id = $(this).data("id");
		if(listaTipos.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaTipos = listaTipos.filter(e => e != id);
        	$(this).removeClass("tipoSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaTipos.push(id);
        	$(this).addClass("tipoSeleccionada");
    	}
    	buscarCartasIntercambioPorCriterios();
	});
	
	//cargar cartas
	function cargarCartas() {
		$("#resultadosCartas").show();
		buscarCartasIntercambioPorCriterios();
	}
	
	async function buscarCartasIntercambioPorCriterios() {
		let criterios = {};
		criterios.expansiones = listaExpansiones;
		criterios.nombre = $("#inputNombreCarta").val();
		criterios.rarezas = listaRarezas;
		criterios.energias = listaEnergias;
		criterios.tipos = listaTipos;
		let cartas = await recuperarCartasIntercambioPorCriterios(criterios);
		mostrarCartas(cartas)
	}
	

	function mostrarCartas(cartas) {
		let contenedor = document.getElementById("mostrarCartas");
		contenedor.innerHTML = "";
		cartas.forEach(carta => {
        	let img = document.createElement("img");
        	img.classList.add("carta"); // clase para aplicar CSS
        	img.src = "/imagenes/cartas/" + carta.expansionId + "/" + carta.cartaJuegoId + ".png";
        	img.dataset.expansionId = carta.expansionId;
        	img.dataset.cartaJuegoId = carta.cartaJuegoId;
        	img.dataset.rarezaId = carta.rarezaId;
        	img.dataset.nombre = carta.nombre;
        	img.dataset.basico = carta.basico;
        	contenedor.appendChild(img);
    	});
		contenedor.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	//funcion añadir carta a la baraja
	$("#mostrarCartas").on("click", ".carta", function() {
		let carta = {};
		carta.expansionId = $(this).data("expansionId");
		carta.cartaJuegoId = $(this).data("cartaJuegoId");
		carta.rarezaId = $(this).data("rarezaId");
    	carta.src = $(this).attr("src");
    	carta.nombre = $(this).data("nombre");
    	carta.basico = $(this).data("basico");
    	aniadirCartaBaraja(carta);
	});
	
	function aniadirCartaBaraja(nuevaCarta) {
		let insertada = false;
		if(listaSeleccionada != null && listaSeleccionada) {
			cartasBarajaOfrecer.forEach((carta, index) => {
				if(carta.expansionId == 0 && carta.cartaJuegoId == 0 && !insertada) {
					carta.src = "/imagenes/cartas/" + nuevaCarta.expansionId + "/" + nuevaCarta.cartaJuegoId + ".png";
					carta.expansionId = nuevaCarta.expansionId;
	        		carta.cartaJuegoId = nuevaCarta.cartaJuegoId;
	        		carta.rarezaId = nuevaCarta.rarezaId;
	        		carta.nombre = nuevaCarta.nombre;
	        		carta.basico = nuevaCarta.basico;
	        		carta.posicion = index;
	        		insertada = true;
				}
			});
			recargarOfrecer();
		} else if(listaSeleccionada != null && !listaSeleccionada) {
			cartasBarajaQuerer.forEach((carta, index) => {
				if(carta.expansionId == 0 && carta.cartaJuegoId == 0 && !insertada) {
					carta.src = "/imagenes/cartas/" + nuevaCarta.expansionId + "/" + nuevaCarta.cartaJuegoId + ".png";
					carta.expansionId = nuevaCarta.expansionId;
	        		carta.cartaJuegoId = nuevaCarta.cartaJuegoId;
	        		carta.rarezaId = nuevaCarta.rarezaId;
	        		carta.nombre = nuevaCarta.nombre;
	        		carta.basico = nuevaCarta.basico;
	        		carta.posicion = index;
	        		insertada = true;
				}
			});
			recargarQuerer();
		}
	}
	
	//funcionalidad click boton ofrecer cartas
	$(".tipoIntercambio").click(function() {
		let valor = $(this).data("id");
		$(".tipoIntercambio").removeClass("tipoSeleccionada");
		if(listaSeleccionada === valor) {
			listaSeleccionada = null;
		} else {
			listaSeleccionada = valor;
			$(this).addClass("tipoSeleccionada");
		}
	});
	
	//funcion eliminar carta de la seccion de ofrecer
	$("#cartasBarajaOfrecer").on("click", ".cartaBarajaAniadida", function() {
		let posicionEliminar = $(this).data("posicion");
    	eliminarCartaOfrecer($(this).data("posicion"));
	});
	
	//funcion eliminar carta de la seccion de querer
	$("#cartasBarajaQuerer").on("click", ".cartaBarajaAniadida", function() {
		let posicionEliminar = $(this).data("posicion");
    	eliminarCartaQuerer($(this).data("posicion"));
	});
	
	function eliminarCartaOfrecer(posicionEliminar) {
		const index = cartasBarajaOfrecer.findIndex(carta => carta.posicion === posicionEliminar);
		if (index !== -1) {
    		cartasBarajaOfrecer.splice(index, 1);
    		cartasBarajaOfrecer.push({
    			expansionId: 0,
    			cartaJuegoId: 0,
    			rarezaId: 0,
    			nombre: null,
    			basico: null
  			});
  		}
		recargarOfrecer();
	}
	function eliminarCartaQuerer(posicionEliminar) {
		const index = cartasBarajaQuerer.findIndex(carta => carta.posicion === posicionEliminar);
		if (index !== -1) {
    		cartasBarajaQuerer.splice(index, 1);
    		cartasBarajaQuerer.push({
    			expansionId: 0,
    			cartaJuegoId: 0,
    			rarezaId: 0,
    			nombre: null,
    			basico: null
  			});
  		}
		recargarQuerer();
	}
	
	$("#btnPublicarIntercambio").click(function() {
		$("#confirmar").show();
	});
	
	$("#btnCancelar").click(function() {
		$("#confirmar").hide();
	});
	
	$("#btnPublicar").click(function() {
		publicarIntercambio();
		$("#confirmar").hide();
	});
	 
    async function publicarIntercambio() {
		let errores = validarDatos();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				let intercambio = construirIntercambio();
				await publicar(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha publicad correctamente el intercambio. Podrás verla en la aplicación de 'Intercambios Activos'", "");
				limpiar();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}
		}
	}
	
	function validarDatos() {
		let errores = "";
		//validar que hay al menos una carta que ofrezcas
		let contadorCartas = 0;
		cartasBarajaOfrecer.forEach(carta => {
			if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				contadorCartas++;
			}
		});
		if(contadorCartas == 0) {
			errores += "- Tienes que ofrecer al menos una carta" + "<br>";
		}
		
		//validar que hay al menos una carta que quieras
		contadorCartas = 0;
		cartasBarajaQuerer.forEach(carta => {
			if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				contadorCartas++;
			}
		});
		if(contadorCartas == 0) {
			errores += "- Tienes que añadir al menos una carta que quieras" + "<br>";
		}
		
		//validar que no hay una misma carta mas de una vez en ofrecer
		let cartaRepetidaOfrecer = new Set();
		cartasBarajaOfrecer.forEach(carta1 => {
			if(carta1.expansionId != 0 && carta1.cartaJuegoId != 0) {
				let contadorCartas = 0;
				let nombreCarta = carta1.nombre;
				cartasBarajaOfrecer.forEach(carta2 => {
					if(carta2.expansionId != 0 && carta2.cartaJuegoId != 0) {
						if(carta1.expansionId == carta2.expansionId && carta1.cartaJuegoId == carta2.cartaJuegoId) {
							contadorCartas++;
						}
					}
				});
				if(contadorCartas > 1) {
					cartaRepetidaOfrecer.add(nombreCarta);
				}
			}
		});
		
		cartaRepetidaOfrecer.forEach(nombreCarta => {
			errores += "- Has ofrecido la carta de " + nombreCarta + " mas de una vez" + "<br>";
		});
		
		//validar que no hay una misma carta mas de una vez en querer
		let cartaRepetidaQuerer = new Set();
		cartasBarajaQuerer.forEach(carta1 => {
			if(carta1.expansionId != 0 && carta1.cartaJuegoId != 0) {
				let contadorCartas = 0;
				let nombreCarta = carta1.nombre;
				cartaRepetidaQuerer.forEach(carta2 => {
					if(carta2.expansionId != 0 && carta2.cartaJuegoId != 0) {
						if(carta1.expansionId == carta2.expansionId && carta1.cartaJuegoId == carta2.cartaJuegoId) {
							contadorCartas++;
						}
					}
				});
				if(contadorCartas > 1) {
					cartaRepetidaQuerer.add(nombreCarta);
				}
			}
		});
		
		cartaRepetidaQuerer.forEach(nombreCarta => {
			errores += "- Has puesto que quieres la carta de " + nombreCarta + " mas de una vez" + "<br>";
		});
		
		//validar que hay al menos la misma rareza de ofrecer y querer
		cartasBarajaOfrecer.forEach(carta1 => {
			if(carta1.expansionId != 0 && carta1.cartaJuegoId != 0) {
				let coincideRareza = false;
				cartasBarajaQuerer.forEach(carta2 => {
					if(carta2.expansionId != 0 && carta2.cartaJuegoId != 0) {
						if(carta1.rarezaId == carta2.rarezaId) {
							coincideRareza = true;
						}
					}
				});
				if(!coincideRareza) {
					errores += "- No se ha incluido ninguna carta que quieras que tenga la misma rareza que la carta " + carta1.nombre + "<br>";
				}
			}
		});	
		cartasBarajaQuerer.forEach(carta1 => {
			if(carta1.expansionId != 0 && carta1.cartaJuegoId != 0) {
				let coincideRareza = false;
				cartasBarajaOfrecer.forEach(carta2 => {
					if(carta2.expansionId != 0 && carta2.cartaJuegoId != 0) {
						if(carta1.rarezaId == carta2.rarezaId) {
							coincideRareza = true;
						}
					}
				});
				if(!coincideRareza) {
					errores += "- No se ha incluido ninguna carta que ofrezcas que tenga la misma rareza que la carta " + carta1.nombre + "<br>";
				}
			}
		});

		return errores;
	}
	
	function construirIntercambio() {
		let intercambio = {};
		intercambio.ofertanteId = usuario.id;
		intercambio.cartasOfrecer = cartasBarajaOfrecer
			.filter(carta => carta.expansionId != 0 && carta.cartaJuegoId != 0)
			.map(carta => carta.expansionId + "," + carta.cartaJuegoId)
			.join(";")
		intercambio.cartasQuerer = cartasBarajaQuerer
			.filter(carta => carta.expansionId != 0 && carta.cartaJuegoId != 0)
			.map(carta => carta.expansionId + "," + carta.cartaJuegoId)
			.join(";")
		return intercambio;
	}
});